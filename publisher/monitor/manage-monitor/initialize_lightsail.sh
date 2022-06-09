sudo apt-get update
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    apt-transport-https \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
apt-cache policy docker-ce
sudo apt install -y docker-ce
sudo usermod -aG docker ${USER}
(crontab -l 2>/dev/null; echo -e "0 * * * * docker build --pull monitor/balance -t monitor-balance && docker run --rm --env-file monitor/balance/.env monitor-balance > monitor/log-balance.txt 2>&1 \n0 * * * * docker build --pull monitor/price -t monitor-price && docker run --rm --env-file monitor/price/.env monitor-price > monitor/log-price.txt 2>&1") | crontab -
