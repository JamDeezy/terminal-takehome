Terminal 49 Take home

# Part 1 - Search endpoint

## Input Example Booking Numbers
````
(PABV)TXG790195200
(PABV)TXG790195100
(PABV)TXG790214500
````
- Assume input can contain PABV
- Assume all codes are prepended with TXG
- Assume that the rest of the codes are digits [0-9] length = 9

## PILShip API
Request:
````
GET @ https://www.pilship.com/shared/ajax/
{
  ref_num:TXG790195200,      // Reference number
  fn:get_tracktrace_bl,      // Callback?
  _:1496507593439            // UUID?
}
````
Response:
````
{
  "error":{
    "type":0,
    "msg":"FN not set!"
  },
  "request":"Array\n(\n [ref_num] => TXG790195200\n [_] => 1496507593439\n [fn] => get_tracktrace_bl\n)\n",
  "data":{
    "err":0,
    "err_msg":"",
    "refnum_info":"B\/L Number: <b>TXG790195200<\/b><br \/>",
    "scheduletable":"<tr class=\"resultrow\"><td class=\"arrival-delivery\"><br \/>2017-04-18<br \/>2017-04-19<\/td><td class=\"location\">Load Port<br \/>XINGANG<br \/>CNTXG<\/td><td class=\"vessel-voyage\"><br \/>CSCL AUTUMN<br \/>VQC60007E<\/td><td class=\"next-location\"><br \/>USOAK<br \/>2017-05-15<\/td><\/tr>",
    "containers":"<tr class=\"titles\"><td class=\"container-num\">Container #<\/td><td class=\"container-type\">Size\/Type<\/td><td class=\"movement\">Movement Type<\/td><td class=\"date\">Date<\/td><td class=\"latest-event\">Latest Event<\/td><td class=\"place\">Place<\/td><\/tr><tr class=\"resultrow\" id=\"wrapper_SEGU1712879\"><td colspan=\"6\"><table><tr><td class=\"container-num\"><b>SEGU1712879<\/b> <a class=\"trackinfo\" href=\"javascript:void(0);\" name=\"trackinfo::bl::TXG790195200::SEGU1712879\"><b>Trace<\/b><\/a> <span class=\"subsearch-ajax hidden\"><\/span><\/td><td class=\"container-type\">20GP<\/td><td class=\"movement\">FCL\/FCL<\/td><td class=\"date\">2017-05-26 23:59:00<\/td><td class=\"latest-event\">Vessel Loading<\/td><td class=\"place\">OAKLAND<\/td><\/tr><\/table><table id=\"subresult_wrapper_SEGU1712879\" class=\"big_subresult_wrapper hidden\"><tbody class=\"big_subresult_main\" id=\"big_subresult_main_SEGU1712879\"><\/tbody><\/table><\/td><\/tr>",
    "scheduleinfo":"Place of Receipt <b>XINGANG [CNTXG]<\/b><br \/>Place of Delivery <b>OAKLAND [USOAK]<\/b><br \/>No. of Containers<b>1 x 20GP<\/b><br \/>"
  }
}
# error
{
  "error":{
    "type":1,
    "msg":"API Error: Invalid Parameter"
  },
  "request":"Array\n(\n [ref_num] => TXG790214501\n [_] => 1496507593439\n [fn] => get_tracktrace_bl\n)\n"
}
````
Requirements
````
2. The booking details should display the following details with labels.
  1. B/L Number: TXG790195200
  2. Steamship Line: PIL
  3. Origin: Xingang
  4. Destination: Oakland
  5. Vessel: CSCL AUTUMN
  6. Voyage: VQC60007E
  7. Vessel ETA: April 19, 2017
  8. List of containers: for each container display:
    1. Number: SEGU1712879
    2. Size: 20’
    3. Type: GP
````
- Assume "Steamship Line" is constant "PIL"
- Assume "Vessel ETA" is the delivery date, not arrival
- Assume container attribute "Size" to be digits
- Assume container attribute "Type" to be alphanumeric after "Size"



# Setup
````
$ psql --version
psql (PostgreSQL) 9.6.1
$ cat .ruby-version
ruby-2.2.0@terminal-takehome
$ rails --version
Rails 4.2.0
````

## Run
````
postgres -D /usr/local/var/postgres
psql postgres
postgres=# create role terminal with createdb login password 'terminal';
rake db:create && rake db:migrate
````