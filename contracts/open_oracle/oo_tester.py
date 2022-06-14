#Test Open Oracle functionality against 0kx price feeds. An example of how this might be done
# See https://www.okx.com/docs-v5/en/#rest-api-market-data-get-oracle

#
#Pub_Key support
#

#First we add 0kx support to the Oracle controller storage by calling the add_supported_public_key function
# from Admin, to post publisher, pub_key, and is_active through storage and a SPK struct

#Alternatively could chose not to and try the next section intending the signature to be correct but the not having publisher to fail
#SOLUTION: Actually just require specifying publisher when passing signature through validation function. It will make our search so 
# much easier, and of course an end poster will know who the publisher is

#
#Recieving the signature report and independent posters, posting
#


# Requesting the HTTPS GET /api/v5/market/open-oracle request from the OKx API
# It is up to those indviduals to deserialize their request to only specifically be ETH data, or only specifically be BTC data

#Post the bare minimum at the function the public interacts with

# 1) the (r,s) signature point, 2) the messages 3) price 4) timestamp 
#
