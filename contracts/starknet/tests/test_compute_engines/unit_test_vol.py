import numpy as np



vals = np.asarray([1306.296631, 1331.713623, 1310.447021, 1285.744263, 1283.200928, 1294.809814]).reshape(6,1)
dates = np.asarray([1665925200 + (i * 86400) for i in range(6)]).reshape(6,1)
data = np.hstack((vals, dates))

def calculate_volatility(data): 
    lognormal_dif = np.log(data[1:, 0] / data[:-1, 0])
    #print(lognormal_dif)
    vol = 0
    for i in range(len(data) - 1): 
        vol += (lognormal_dif[i] ** 2) / ((data[i+1,1] - data[i,1])  * (len(data) - 1))
    #print(np.sqrt(vol)) 
    return (np.sqrt(vol) * 5615.69 * 100) 


def main(): 
    print(calculate_volatility(data))


if __name__ == "__main__":
    main()