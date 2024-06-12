const { getDayText, getIconFilename, generateWeeklyForcast } = require('../util');

describe("Unit tests for fetching days of the week", () => {
  it("should return Monday", () => {
    day_val = getDayText(1);
    expect(day_val).toBe('Monday');
  });

  it("should return Sunday", () => {
    day_val = getDayText(0);
    expect(day_val).toBe('Sunday');
  });

  it("should return Invalid Date as Default", () => {
    day_val = getDayText(10);
    expect(day_val).toBe('Invalid Date');
  });
});

describe("Unit tests for returning weekly forcast", () => {

  const weatherObj = {
    city: {
      name: 'Sydney'
    },
    cod: '200',
    cnt: 7,
    list: [
      {
        dt: 1590282000,
        sunrise: 1590266805,
        sunset: 1590303454,
        temp: {
          day: 14.27,
          min: 14.17,
          max: 14.27,
          night: 14.17,
          eve: 14.27,
          morn: 14.27
        },
        weather: [{
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03n"
        }],
        speed: 11.59,
        deg: 205,
        clouds: 40
      },
      {
        dt: 1590368400,
        sunrise: 1590353246,
        sunset: 1590389826,
        temp: {
          day: 14.6,
          min:  14.34,
          max: 16.06,
          night: 16.06,
          eve: 15.03,
          morn: 14.38
        },
        weather: [{
          id: 502,
          main: "Rain",
          description: "heavy intensity rain",
          icon: "10d"
        }],
        speed: 10.29,
        deg: 205,
        clouds: 87
      },
      {
        dt: 1590454800,
        sunrise: 1590439685,
        sunset: 1590476199,
        temp: {
          day: 14.87,
          min: 14.86,
          max: 16.07,
          night: 14.86,
          eve: 16.07,
          morn: 15.62
        },
        weather: [{
          id: 501,
          main: "Rain",
          description: "moderate rain",
          icon: "03n"
        }],
        speed: 7.89,
        deg: 200,
        clouds: 96
      },
      {
        dt: 1590541200,
        sunrise: 1590526125,
        sunset: 1590562574,
        temp: {
          day: 15.11,
          min: 12.82,
          max: 16.79,
          night: 13.96,
          eve: 16.42,
          morn: 13.28
        },
        weather: [{
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d"
        }],
        speed: 3.29,
        deg: 224,
        clouds: 75
      },
      {
        dt: 1590627600,
        sunrise: 1590612563,
        sunset: 1590648951,
        temp: {
          day: 15.05,
          min: 11.65,
          max: 17.27,
          night: 14.72,
          eve: 16.52,
          morn: 12.13
        },
        weather: [{
          id: 501,
          main: "Rain",
          description: "moderate rain",
          icon: "10d"
        }],
        speed: 2.15,
        deg: 264,
        clouds: 1
      },
      {
        dt: 1590714000,
        sunrise: 1590699001,
        sunset: 1590735328,
        temp: {
          day: 14.9,
          min: 13.16,
          max: 16.53,
          night: 15.11,
          eve: 15.99,
          morn: 13.21
        },
        weather: [{
          id: 501,
          main: "Rain",
          description: "moderate rain",
          icon: "03n"
        }],
        speed: 3.62,
        deg: 223,
        clouds: 84
      },
      {
        dt: 1590800400,
        sunrise: 1590785438,
        sunset: 1590821708,
        temp: {
          day: 15.28,
          min: 13.34,
          max: 17.28,
          night: 14.02,
          eve: 14.27,
          morn: 14.27
        },
        weather: [{
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03n"
        }],
        speed: 1.79,
        deg: 248
      }
    ]
  }
  
  it("should return day of the week", () => {
    forcastResponse = generateWeeklyForcast(weatherObj);
    
    expect(forcastResponse).not.toBeNull();

    expect(forcastResponse).toEqual(          
      expect.arrayContaining([      
        expect.objectContaining({   
          day: 'Monday'               
        })
      ])
    );
    
    expect(forcastResponse).toEqual(          
      expect.arrayContaining([      
        expect.objectContaining({   
          day: 'Wednesday'               
        })
      ])
    );

    expect(forcastResponse[0]).toBeTruthy();
  });
});

describe("Unit tests for weather icon", () => {
  it("should return cloudy icon", () => {
    weather_icon = getIconFilename('03n');
    expect(weather_icon).toBe('cloud-scattered.svg');
  });

  it("should return expected icon", () => {
    weather_icon = getIconFilename('50n');
    expect(weather_icon).toBe('raindrop.svg');
    expect(getIconFilename('01n')).toBe('moon.svg');
  });

  it("should return empty", () => {
    day_val = getIconFilename('');
    expect(day_val).toBe('');
  });

  it("should not return storm", () => {
    day_val = getIconFilename('11d');
    expect(day_val).not.toBe('snowflake.svg');
  });

  it("should not return snowflake", () => {
    day_val = getIconFilename('13n');
    expect(day_val).not.toBe('raindrop.svg');
  });

  it("should return sunny icon", () => {
    day_val = getIconFilename('01d');
    expect(day_val).toBe('sunny.svg');
  });

  it("should return rain icon", () => {
    weather_icon = getIconFilename('10d');
    expect(weather_icon).toBe('rain.svg');
  });
});