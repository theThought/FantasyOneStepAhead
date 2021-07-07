FantasyRatings = class {
  constructor(theParent) {
    this.Parent = theParent
    this.Data = this.Parent.bookData.ratings
    this.RatingsDialog = document.getElementById('readbydialog')
    this.RatingsDialogOk = document.getElementById('RatingsDialogOk')
    this.LaunchRatingsDialog = document.getElementById('addreader')

    this.LaunchRatingsDialog.addEventListener('click', event => this.onLaunchRatingsDialog_Click(event))
    this.RatingsDialogOk.addEventListener('click', event => this.onRatingsDialogOk_Click(event))
  }

  onLaunchRatingsDialog_Click (theEvent) {
    this.ShowDialog()
  }

  onRatingsDialogOk_Click(theEvent)
  {
    this.HideDialog()
  }

  Display() {
    const readByContainer = document.getElementById('readbycontainer')
    this.Data.forEach(currentRating => this.ShowRating(currentRating, readByContainer))
  }

  ShowDialog() {
    this.RatingsDialog.classList.remove('notvisible')
  }

  HideDialog() {
    this.RatingsDialog.classList.add('notvisible')
  }

  CalculateSummary () {

  }

  Add () {

  }

  Remove () {

  }

  Find() {

  }

  ShowRating (theRating, theSection) {
  /* 
  <section class='readbycontainer'>
    <span>Mary</span>
    <span class='readbystars'>
      <span id="star1" class="othersrating rating-star-full"></span>
      <span id="star2" class="othersrating rating-star-full"></span>
      <span id="star3" class="othersrating rating-star"></span>
      <span id="star4" class="othersrating rating-star"></span>
      <span id="star5" class="othersrating rating-star"></span>
    </span>
  </section>
  */
    const newNameSpan = document.createElement('span')
    newNameSpan.textContent = theRating.who

    const newStarsSpan = document.createElement('span')
    newStarsSpan.classList.add('readbystars')

    for (var counter=1; counter <= 5; counter++) {
      const newStar = document.createElement('span')
      newStar.setAttribute('id', 'star' + counter)
      newStar.classList.add('othersrating')
      if (counter <= theRating.score) newStar.classList.add('rating-star-full')
      else newStar.classList.add('rating-star')

      newStarsSpan.appendChild(newStar)
    }

    theSection.appendChild(newNameSpan)
    theSection.appendChild(newStarsSpan)
  }
}

