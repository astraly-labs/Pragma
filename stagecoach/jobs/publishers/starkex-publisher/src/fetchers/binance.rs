
use serde::{Deserialize, Serialize};
use serde_json::Value;

use tokio;
use std::fmt;
use anyhow::Error;
use reqwest::get;

#[derive(Debug, Deserialize)]
pub struct InstrumentInfo {
    symbol: String,
    expiryDate: u64,
    strikePrice: String,
    

}

#[derive(Debug, Deserialize)]
pub struct ResponseInfo {
    optionSymbols: Vec<InstrumentInfo>,
}

#[derive(Debug, Deserialize)]
struct MarkPrice { 
    markIV: f64,
}


#[derive(Debug, Deserialize, Clone)]
pub struct OptionData { 
    pub symbol: String,
    pub expiryDate: u64,
    pub strikePrice: f64,
    pub mark_iv: f64,
    pub volume:f64,
}

#[derive(Debug, Deserialize)]
pub struct ResponseData {
    pub optionSymbols: Vec<OptionData>,
}

#[derive(Debug, Deserialize)]
struct ResponseMarkPrice {
    markIV: MarkPrice,
}


impl ResponseData { 

    fn new() -> ResponseData { 
        ResponseData { 
            optionSymbols: Vec::new(),
        }
    }
}

#[derive(Debug, Deserialize)]
struct MarkInfo {
    askIV: String,
    bidIV: String,
    delta: String,
    gamma: String,
    highPriceLimit: String,
    lowPriceLimit: String,
    markIV: String,
    markPrice: String,
    symbol: String,
    theta: String,
    vega: String,
}


#[derive(Debug, Deserialize)]
struct VolumeInfo {
    symbol: String,
    volume: String,
}

#[derive(Debug, Deserialize)]
struct ResponseVolumeInfo {
    optionSymbols: Vec<VolumeInfo>,
}


const ASSETS :[&str; 1] = ["BTC"];

pub async fn fetch_mark_info(instrument_name: String, expiry_date: u64, strikePrice: f64) -> Result<OptionData, Error> {
    let base_url = "https://eapi.binance.com/";
    let endpoint = "eapi/v1/mark?symbol=";
    let url = format!("{}{}{}", base_url, endpoint, instrument_name);

    let resp = match get(url).await {
        Ok(response) => response,
        Err(e) => return Err(Error::msg(e)),
    };

    let response: Vec<Value> = match resp.json().await {
        Ok(response) => response,
        Err(e) => return Err(Error::msg(e)),
    };



    let mark_iv_str = response[0]["markIV"].as_str().unwrap();
    // let mark_iv_str = &response.markIV;
    let mark_iv_f64 = if let Ok(value) = mark_iv_str.parse::<f64>() {
        value
    } else {
        return Err(Error::msg("Failed to convert markIV to f64"));
    };

    let volume_endpoint = "eapi/v1/ticker";
    let volume_url = format!("{}{}?symbol={}", base_url, volume_endpoint, instrument_name);
    let resp_vol = match get(volume_url).await {
        Ok(response) => response,
        Err(e) => return Err(Error::msg(e)),
    };

    let response_vol: Vec<VolumeInfo> = match resp_vol.json().await {
        Ok(response) => response,
        Err(e) => return Err(Error::msg(e)),
    };
    let volume_f64 = if let Ok(value) = response_vol[0].volume.parse::<f64>() {
        value
    } else {
        return Err(Error::msg("Failed to convert markIV to f64"));
    };
    let result: OptionData = OptionData {
            symbol: instrument_name,
            expiryDate: expiry_date,
            strikePrice: strikePrice,
            mark_iv: mark_iv_f64,
            volume:volume_f64,
        };
    
    Ok(result)
}



pub async fn fetch_options_info() -> Result<Vec<InstrumentInfo>, Error> {
    
    let base_url = "https://eapi.binance.com";
    let endpoint = "/eapi/v1/exchangeInfo";
    let url = format!("{}{}", base_url, endpoint);
    let response: ResponseInfo = reqwest::get(url).await?.json().await?;
    Ok(response.optionSymbols)
}



#[tokio::main]
pub async fn main() -> Result<ResponseData, Error> {

    let mut binanceOptionData :ResponseData = ResponseData::new();
    
    let options_info = fetch_options_info().await?;
    for option in options_info {
        let asset : String= option.symbol.chars().take(3).collect();
        if ASSETS.contains(&asset.as_str()) {
            let mut counter: usize = 0;
            if counter<79{
                counter = counter + 1;

            }
            else {
                 tokio::time::sleep(std::time::Duration::from_millis(5000)).await;
                 counter=0; 
            }
            match option.strikePrice.parse::<f64>() {
            Ok(number) => {
                let result = fetch_mark_info(option.symbol, option.expiryDate, number).await?;
                println!("Result: {:?}", result); 
                binanceOptionData.optionSymbols.push(result);
                        }
            Err(e) => eprintln!("Error: {:?}", e),
            }
        }
        //TODO: Add error handling when fetching too much infos from binance
    }
    
    Ok(binanceOptionData)

    
}
// #[tokio::main]
// pub async fn main() {
//     match fetch_options_info().await {
//         Ok(option_symbols) => println!("Option Symbols: {:?}", option_symbols),
//         Err(e) => eprintln!("Error: {:?}", e),
//     }
// }