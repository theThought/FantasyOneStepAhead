console.log("hello")
// There is one class for the Form
// Each class can have:
// Methods - An Action
// Properties - A value
// Events - Something that happens
//Constructor - an action that occurs as an instance is created

// Functions (Private) - Actions that only the class can see

EntryForm = class {
 constructor ()
 {
   // Properties
  this.LibraryData = new FantasyLibrary()

  //Event Listeners
   document.getElementById('booktitle').addEventListener('change', event => this.onChange(event))
   document.getElementById('bookauthor').addEventListener('change', event => this.onChange(event))

   const allElements = document.getElementsByTagName('input')
   const allElementsCount = allElements.length

   for (var counter = 0; counter < allElementsCount; counter++) {
     const currentElement = allElements[counter]
     currentElement.addEventListener('focus', event => this.onFocus(event))
   }

   //Populate datalist
   
   this.GenreList_Populate()
   this.EntryForm_Populate()

   this.EventListener_Setup()
 }

  onChange(theEvent)
    {
      const currentInput = theEvent.target
      this.CheckforEmptyInput(currentInput)
    }

  onFocus(theEvent)
    {
      const currentInput = theEvent.target
      console.log(currentInput.outerHTML)
    }

  onStarClick (theEvent) {
    console.log(this)
    const starValue = theEvent.target.id.substring(4)
    this.FormatStars('star', starValue, 5)
  }

  onTagButton_Click (theEvent) {
    const tagToAdd = document.getElementById('taginput').value 
    const tagTemplate = document.getElementById('tagitemtemplate')
    const newTag = tagTemplate.cloneNode(true)
    const bookTagsNode = document.getElementById('tagcatalog')
    newTag.classList.remove('notvisible')
    newTag.setAttribute('id', 'tag' + tagToAdd)
    
    const textTags = newTag.getElementsByClassName('tagname')
    textTags[0].textContent = tagToAdd

    bookTagsNode.insertBefore(newTag, bookTagsNode.childNodes[0])
  }

  onInfluenceContainer_MouseMove (theEvent) {
    const mouseXPos = (theEvent.x - document.getElementById('influencecontainer').offsetLeft)
    if (theEvent.buttons !== 1) return
    const currentStarIndex = (mouseXPos / 28)
    const currentStarIndexFloor = Math.floor(currentStarIndex)
    const currentStarHalf = ((currentStarIndex - currentStarIndexFloor) < 0.51)
    var currentStarIndexInt = Math.ceil(currentStarIndex)
  
    if (currentStarIndexInt>10) currentStarIndexInt = 10
    this.FormatStars('influence', currentStarIndexInt, 10, currentStarHalf)
  }

  EventListener_Setup () {
    const stars = document.getElementsByClassName("rating")
    const starsCount = stars.length 
    for (var counter=0; counter < starsCount; counter++)
    {
      const currentStar = stars[counter]
      currentStar.addEventListener('click', event => this.onStarClick(event))
    }

    document.getElementById('influencecontainer').addEventListener('mousemove', event => this.onInfluenceContainer_MouseMove(event))

    document.getElementById('tagbutton').addEventListener('click', event => this.onTagButton_Click(event))
  }

  CheckforEmptyInput(theInput) {
    if (theInput.value === "")
    {
      theInput.classList.add('redbox')
    } else
    {
      theInput.classList.remove('redbox')
    }
  }

  GenreList_Populate() {
    const currentDataList = document.getElementById('genredatalist')
    console.log(this.LibraryData.GenreList.genres)
    const genreListSorted = this.LibraryData.GenreList.genres.sort()
    const genreListLength = this.LibraryData.GenreList.genres.length

    for (var counter = 0; counter < genreListLength; counter++) {
      const genreItem = genreListSorted[counter]
      const newOption = document.createElement('option')
      newOption.textContent = genreItem
      currentDataList.append(newOption) 
    }
  }

EntryForm_Populate() {
    document.getElementById('booktitle').value = this.LibraryData.bookData.title
    document.getElementById('bookauthor').value = this.LibraryData.bookData.author
    document.getElementById('bookgenre').value = this.LibraryData.bookData.genre

    this.FormatStars('star', this.LibraryData.bookData.rating, 5)  
    this.FormatStars('influence', this.LibraryData.bookData.influence, 10)

    document.getElementById('bookpages').value = this.LibraryData.bookData.length

    const seriesName = this.LibraryData.bookData.series
    document.getElementById('bookseries').value = seriesName
    document.getElementById('bookcurrent').value = this.LibraryData.bookData.episode
    const seriesDetail = this.LibraryData.GetSeriesDetail(seriesName)
    document.getElementById('booktotal').value = seriesDetail.episodes
  }

  FormatStars(theClassStem, theCurrentValue, theMaxValue, theHalfStar) {
    if (theHalfStar == undefined) theHalfStar = false

    for (var counter = 1; counter < theCurrentValue; counter++) {
      const currentStar = document.getElementById(theClassStem + [counter])
      currentStar.classList.remove('rating-star')
      currentStar.classList.remove('rating-star-half')
      currentStar.classList.add('rating-star-full')
    }

    if (theCurrentValue > 0) {
      const exactStar = document.getElementById(theClassStem + [theCurrentValue])
      if (theHalfStar) {
        exactStar.classList.remove('rating-star')
        exactStar.classList.remove('rating-star-full')
        exactStar.classList.add('rating-star-half')
      }
      else {
        exactStar.classList.remove('rating-star')
        exactStar.classList.remove('rating-star-half')
        exactStar.classList.add('rating-star-full')
      }
    }
    
    for (var counter = theCurrentValue + 1; counter <= theMaxValue; counter++) {
       const currentStar = document.getElementById(theClassStem+[counter])
       currentStar.classList.add('rating-star')
       currentStar.classList.remove('rating-star-full')
      currentStar.classList.remove('rating-star-half')
    }
  }
}

const myForm = new EntryForm()
