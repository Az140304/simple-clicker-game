const localStorageKey = 'PLAYER_INFO';

    if (typeof Storage !== 'undefined') {

      // set to default value for first-timer 
      if (localStorage.getItem(localStorageKey) === null) { 
        const player = {
            name: "Player",
            clickCounter: 0,
            colorTheme: "white"
        };

        localStorage.setItem(localStorageKey, JSON.stringify(player));

      }

      const tambahNilai = document.getElementById("#tambahNilai");
      var dropdown = document.getElementsByClassName("item-dropdown");
      const musicToggle = document.getElementById("musicToggle");
      const sfxToggle = document.getElementById("sfxToggle");
      const music = document.getElementById("bg-music")
      var r = document.querySelector(':root');
      
      musicToggle.volume = 0.2;
      var i;

      const playerString = localStorage.getItem(localStorageKey);
      let playerJSON = JSON.parse(playerString);

      document.getElementById("#tambahNilai").innerText = playerJSON.clickCounter; 
      ubahWarna(playerJSON.colorTheme);

      function setMusic() {
        if(musicToggle.checked){
          music.play();
        } else {
          music.pause();
          music.currentTime = 0;
        }
      }

      function getShadowColor() {
        const container = document.querySelector('.container');
        const computedStyle = getComputedStyle(container);
        const backgroundColor = computedStyle.backgroundColor; 
        const rgbValues = backgroundColor.match(/\d+/g);
        const rgbNumbers = rgbValues.map(Number);

        let persen = -50;

        const newR = Math.min(255, Math.floor(rgbNumbers[0] + (rgbNumbers[0] * persen) / 100));
        const newG = Math.min(255, Math.floor(rgbNumbers[1] + (rgbNumbers[1] * persen) / 100));
        const newB = Math.min(255, Math.floor(rgbNumbers[2] + (rgbNumbers[2] * persen) / 100));

        const newHexRColor = `${newR.toString(16)}`.padStart(2, "0");
        const newHexGColor = `${newG.toString(16)}`.padStart(2, "0");
        const newHexBColor = `${newB.toString(16)}`.padStart(2, "0");

        return "#" + newHexRColor + newHexGColor + newHexBColor;
      }

      tambahNilai.addEventListener("click", function () {
        
        let count = playerJSON.clickCounter;
        count++;
        playerJSON.clickCounter = count;
        localStorage.setItem(localStorageKey, JSON.stringify(playerJSON));
        document.getElementById("#tambahNilai").innerText = playerJSON.clickCounter;

        const rippleEffect = document.createElement("button");
        rippleEffect.style.animation = "ripple 3s";
        rippleEffect.style.borderRadius = "100%";
        rippleEffect.style.border = "none";
        rippleEffect.style.transition = "0.23s ease-in all";

        let shadowColor = getShadowColor();
        
        rippleEffect.style.boxShadow =
          "inset 10px 10px 20px " + shadowColor;

        document.getElementById("animate").appendChild(rippleEffect);
        
        if (sfxToggle.checked) {
          var music = new Audio('./assets/ripple-sound-effect-d.mp3');
          music.volume = 0.9;
          music.play();
        }

        setTimeout(function () {
          document.getElementById("animate").removeChild(rippleEffect);
        }, 3000);
      });

      function resetNilai() {
        playerJSON.clickCounter = 0;

        localStorage.setItem(localStorageKey, JSON.stringify(playerJSON))
        
        let count = playerJSON.clickCounter;

        document.getElementById("#tambahNilai").innerText = count;
        document.getElementById("overlay").style.display = "none";
      }

      function bukaOverlay() {
        document.getElementById("overlay").style.display = "block";
      }

      function tutupOverlay() {
        document.getElementById("overlay").style.display = "none";
      }

      function bukaSidebar() {
        document.getElementById("sidebar").style.display = "block";
      }

      function tutupSidebar() {
        document.getElementById("sidebar").style.display = "none";
      }

      function bukaWarna() {
        document.getElementsByClassName("color-list").style.display = "block";
      }

      function ubahWarna(temaWarna) {
        playerJSON.colorTheme = temaWarna;
        localStorage.setItem(localStorageKey, JSON.stringify(playerJSON));

        switch (temaWarna) {
          case '0100':
            r.style.setProperty('--bg-color', '#ffffff');
            r.style.setProperty('--text-color', '#000000');
            r.style.setProperty('--highlight', '#cecece');
            break;

          case '0200':
            r.style.setProperty('--bg-color', '#191b19');
            r.style.setProperty('--text-color', '#ffffff');
            r.style.setProperty('--highlight', '#111211');
            break;

          case '0300':
            r.style.setProperty('--bg-color', '#09122C');
            r.style.setProperty('--text-color', '#E17564');
            r.style.setProperty('--highlight', '#193178');
            break;
          
          case '0400':
            r.style.setProperty('--bg-color', '#FABC3F');
            r.style.setProperty('--text-color', '#821131');
            r.style.setProperty('--highlight', '#f4a506');
            break;

          case '0500':
            r.style.setProperty('--bg-color', '#FFDECF');
            r.style.setProperty('--text-color', '#5E6F64');
            r.style.setProperty('--highlight', '#ff9e73');
            break;
        
          default:
            break;
        }

      }


      for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var dropdownContent = this.nextElementSibling;
          if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
          } else {
            dropdownContent.style.display = "block";
          }
        });
      }
    } else {
      alert('Browser yang Anda gunakan tidak mendukung Web Storage');
    }