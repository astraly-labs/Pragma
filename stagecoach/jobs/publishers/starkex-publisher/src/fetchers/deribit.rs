extern crate serde;

use reqwest::Error;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct InstrumentInfo {
    instrument_name: String,
    expiration_timestamp: u64,
    strike: f64,
    

}

#[derive(Debug, Deserialize)]
struct ResponseInfo {
    result: Vec<InstrumentInfo>,
}

#[derive(Debug, Deserialize)]
struct Volume { 
    volume: Option<f64>,
}
#[derive(Debug, Deserialize)]
struct MarkPrice { 
    mark_iv: f64,
    underlying_price:f64,
    stats: Volume
}


#[derive(Debug, Deserialize, Clone)]
pub struct OptionData { 
    pub instrument_name: String,
    pub expiration_timestamp: u64,
    pub strike: f64,
    pub mark_iv: f64,
    pub underlying_price:f64,
    pub volume:Option<f64>,
}

#[derive(Debug, Deserialize)]
pub struct ResponseData {
    pub result: Vec<OptionData>,
}

#[derive(Debug, Deserialize)]
struct ResponseMarkPrice {
    result: MarkPrice,
}


impl ResponseData { 

    fn new() -> ResponseData { 
        ResponseData { 
            result: Vec::new(),
        }
    }
}



const ASSETS :[&str; 1] = ["BTC"];

pub async fn fetch_options_info(symbol:String) -> Result<Vec<InstrumentInfo>, Error> {
    
    let base_url = "https://www.deribit.com/api/v2/public/get_instruments?currency=";
    let endpoint = "&kind=option&expired=false";
    let url = format!("{}{}{}", base_url,symbol, endpoint);
    let response: ResponseInfo = reqwest::get(url).await?.json().await?;
    Ok(response.result)
}

pub async fn fetch_options_data(instrument_name :String, expiration_timestamp : u64, strike:f64) -> Result<OptionData,Error> { 
    let base_url = "https://www.deribit.com/api/v2/public/get_order_book?instrument_name=";
    let url = format!("{}{}", base_url, instrument_name);
    let response: ResponseMarkPrice  = reqwest::get(url).await?.json().await?;
    let result : OptionData = OptionData { 
        instrument_name: instrument_name,
        expiration_timestamp: expiration_timestamp,
        strike: strike,
        mark_iv: response.result.mark_iv,
        underlying_price: response.result.underlying_price,
        volume: response.result.stats.volume
    };
    Ok(result)
}

#[tokio::main]
pub async fn main() -> Result<ResponseData, Box<dyn std::error::Error>> {
    let mut deribitOptionData :ResponseData = ResponseData::new();
    for asset in ASSETS {
        let options_info = fetch_options_info(asset.to_string()).await?;
        for option in options_info {
            let result = fetch_options_data(option.instrument_name, option.expiration_timestamp, option.strike).await?;
            deribitOptionData.result.push(result);
        }
    }
    // println!("{:?}", deribitOptionData.result);
    Ok(deribitOptionData)
    
}
