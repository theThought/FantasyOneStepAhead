FantasyLibrary = class {
  constructor () {
    this.SeriesData = {"series":
      [
        {
          "name": "The Common",
          "episodes": 3
        },
        {
          "name": "The Unbelieveable",
          "episodes": 11
        }
      ]
    }

    this.bookData = {"title":"Stormblood","author":"Jeremy Szal","genre":"Science Fiction","length":390,"rating":3,"influence":7,"series":"The Common","episode":1,"totalepisodes":3,"readthisbook":{"after":null,"before":"BlindSpace"},"reading":[{"start":"06/11/2018 12:43","end":"06/11/2018 13:28","duration":56,"pages":25},{"start":"06/11/2018 17:32","end":"06/11/2018 17:59","duration":27,"pages":15}],"tags":["well","really really spooky", "GoodBye", "Hello"],"ratings":[{"who":"Mary", "score":2},{"who":"John", "score":5}]}

     this.GenreList = {
  'genres':['science fantasy','science fiction','fantasy','grimdark','high fantasy','Horror','Urban Fantasy'
  ]}
  
  this.Ratings = new FantasyRatings(this)
  }
  // properties
  
  // events
  // private functions
  // methods
  GetSeriesDetail (theName) {
    const seriesCount = this.SeriesData.series.length 
    for (var counter = 0; counter < seriesCount; counter++) {
      const currentSeries = this.SeriesData.series[counter]
      if (currentSeries.name === theName) {
        return currentSeries
      }
    }
  }

}