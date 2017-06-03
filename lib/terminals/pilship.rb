class Terminals::Pilship

  include HTTParty

  base_uri "https://www.pilship.com/shared"

  attr_reader :options
  attr_reader :response

  def initialize(ref_num)
    @options = {
      query: {
        ref_num: ref_num,
        fn: 'get_tracktrace_bl', # pilship hack
        _: '1496507593439'
      }
    }
  end

  def fetch
    @response = self.class.get("/ajax/", @options)
  end

  def response_json
    fetch unless @response

    begin
      # Scrub some characters
      json = JSON.parse(@response.parsed_response[3..-1])

      noko_containers = Nokogiri::HTML(json["data"]["containers"])
      noko_scheduletable = Nokogiri::HTML(json["data"]["scheduletable"])
      noko_scheduleinfo = Nokogiri::HTML(json["data"]["scheduleinfo"])

      origin_destination = noko_scheduleinfo.css("p").children
        .map(&:text).reject(&:empty?)
      vessel_voyage = noko_scheduletable.css("td.vessel-voyage").children
        .map(&:text).reject(&:empty?)
      arrival_delivery = noko_scheduletable.css("td.arrival-delivery").children
        .map(&:text).reject(&:empty?)

      containers = noko_containers.css("table > tr").map { |container|
        match = container.css("td.container-type").text.match(/^(\d+)(\w+)/)
        {
          number: container.css("td.container-num").children.map(&:text)[0],
          size: match[1],
          type: match[2]
        }
      }

      {
        ref_num: @options[:query][:ref_num],
        steamship_line: "PIL",
        # Parse schedule info for origin/destination
        origin: origin_destination[1],
        destination: origin_destination[3],
        vessel: vessel_voyage[0],
        voyage: vessel_voyage[1],
        vessel_eta: arrival_delivery.last,
        containers: containers
      }
    rescue Exception
      {
        status: "error",
        message: "No shipment found with reference number #{@options[:query][:ref_num]}"
      }
    end
  end

end