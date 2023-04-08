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
    data: Vec<InstrumentInfo>,
}

#[derive(Debug, Deserialize)]
struct MarkPrice {
    mark_iv: f64,
}

#[derive(Debug, Deserialize)]
pub struct OptionData {
    pub instrument_name: String,
    pub expiration_timestamp: u64,
    pub strike: f64,
    pub mark_iv: f64,
}

#[derive(Debug, Deserialize)]
pub struct ResponseData {
    pub data: Vec<OptionData>,
}

#[derive(Debug, Deserialize)]
struct ResponseMarkPrice {
    data: MarkPrice,
}

impl ResponseData {
    fn new() -> ResponseData {
        ResponseData {
            data: Vec::new(),
        }
    }
}

const API_KEY: &str = "YOUR_KAIKO_API_KEY";
const ASSETS: [&str; 1] = ["BTC"];

pub async fn fetch_options_info(symbol: String) -> Result<Vec<InstrumentInfo>, Error> {
    let base_url = "https://api.kaiko.com/v1/data/derivatives/options/instruments?";
    let url = format!("{}exchange=deribit&symbol={}&apikey={}", base_url, symbol, API_KEY);
    let response: ResponseInfo = reqwest::get(url).await?.json().await?;
    Ok(response.data)
}

pub async fn fetch_options_data(
    instrument_name: String,
    expiration_timestamp: u64,
    strike: f64,
) -> Result<OptionData, Error> {
    let base_url = "https://api.kaiko.com/v1/data/derivatives/options/mark_price?";
    let url = format!(
        "{}exchange=deribit&instrument={}&apikey={}",
        base_url, instrument_name, API_KEY
    );
    let response: ResponseMarkPrice = reqwest::get(url).await?.json().await?;
    let result: OptionData = OptionData {
        instrument_name: instrument_name,
        expiration_timestamp: expiration_timestamp,
        strike: strike,
        mark_iv: response.data.mark_iv,
    };
    Ok(result)
}

#[tokio::main]
pub async fn main() -> Result<ResponseData, Box<dyn std::error::Error>> {
    let mut kaikoOptionData: ResponseData = ResponseData::new();
    for asset in ASSETS {
        let options_info = fetch_options_info(asset.to_string()).await?;
        for option in options_info {
            let result = fetch_options_data(option.instrument_name, option.expiration_timestamp, option.strike).await?;
            kaikoOptionData.data.push(result);
        }
    }
    Ok(kaikoOptionData)
}
