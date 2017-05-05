(() => {
  angular
    .module('game')
    .service('GameService', gameService);
  gameService.$inject = [];
  function gameService() {
    let self = this;
    self.audioFile = "/audio/";

    function loadSound(name, link)
    {
      if($cordovaNativeAudio) {

        $cordovaNativeAudio
          .preloadSimple(name, link)
          .then(function (msg) {
          }, function (error) {
            alert(error);
          });

        self.isSoundLoaded = true;
        playNativeSound('mySound');
      }

    }

    self.playSound = function(name, link)
    {
      if(self.isSoundLoaded)
      {
        playNativeSound(name);
      }
      else
      {
        loadSound(name, link);
      }
    };

    function playNativeSound(name){
      if($cordovaNativeAudio) {
        $cordovaNativeAudio.play(name);
      }

    }

    self.getAudio = function () {
      var audio = {
        good: {fileName: 'good.mp3'},
        bad: {fileName: 'bad.mp3'}
      };

      for (var file in audio) {
        if (audio[file].fileName) {
          loadSound(audio[file].fileName, self.audioFile + audio[file].fileName);
        }
      }
      return audio;
    };

    self.getGames = function (params) {
      var colorsSelected = [];
      var type = params.type || 'colors';
      var gamesFile = type ? type + "/" : self.gamesFile;
      for (var file in self.games[type]) {
        var filter;
        if (params && params.type && params.filter && self.categories[type][params.filter]) {
          filter = self.categories[type][params.filter].key;
        }
        else {
          filter = self.categories.colors.sound.key;
        }

        if (self.games[type][file].fileName) {
          self.games[type][file].audio = new Audio(self.audioFile + gamesFile + self.games[type][file].fileName);
        }

        if (self.games[type][file].fileNameEn) {
          self.games[type][file].audioEn = new Audio(self.audioFile + gamesFile + self.games[type][file].fileNameEn);
        }
        if (self.games[type][file][filter]) {
          self.games[type][file].character = self.games[type][file][params.filter];
          colorsSelected.push(self.games[type][file]);
        }
      }
      return colorsSelected;
    };

    self.shuffle = function (array) {
      var m = array.length, t, i;

      // While there remain elements to shuffle
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    };

    function randomElement(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    self.getCategories = function () {
      return self.categories;
    };

    self.randomElement = function (opts) {
      var array = opts.array;
      var random;
      do {
        random = randomElement(array);
      } while (random === opts.actual);

      return random;
    };

    function init() {
      self.imageFolder = 'images/';
      self.gamesFile = 'colors/';

      self.games = {
        colors: [
          {
            name: 'rouge',
            nameEn: 'red',
            colorName: 'red',
            fileName: 'rouge.mp3',
            fileNameEn: 'red.mp3',
            pawPatrol: 'marcus.jpeg',
            robocarpoli: 'roy.jpg',
            viceVersa: 'colere.jpeg'
          },
          {
            name: 'bleu',
            nameEn: 'blue',
            colorName: 'blue',
            fileName: 'bleu.mp3',
            fileNameEn: 'blue.mp3',
            pawPatrol: 'chase.jpeg',
            robocarpoli: 'poli.jpg',
            viceVersa: 'tristess.jpeg'
          },
          {
            name: 'jaune',
            nameEn: 'yellow',
            colorName: 'yellow',
            fileName: 'jaune.mp3',
            fileNameEn: 'yellow.mp3',
            pawPatrol: 'ruben.jpeg',
            viceVersa: 'joie.jpeg'
          },
          {
            name: 'vert',
            nameEn: 'green',
            colorName: 'green',
            fileName: 'vert.mp3',
            fileNameEn: 'green.mp3',
            pawPatrol: 'rocky.jpeg',
            robocarpoli: 'heli.jpg',
            viceVersa: 'degout.jpeg'
          },
          {
            name: 'blanc',
            nameEn: 'white',
            colorName: 'white',
            fileName: 'grisFr.mp3',
            fileNameEn: 'grey.mp3',
            pawPatrol: 'everest.jpg'
          },
          {
            name: 'noir',
            nameEn: 'black',
            colorName: 'black',
            fileName: 'noir.mp3',
            fileNameEn: 'black.mp3'
          },
          {
            name: 'violet',
            nameEn: 'purple',
            colorName: 'purple',
            fileName: 'violet.mp3',
            fileNameEn: 'violetEn.mp3',
            viceVersa: 'peur.jpeg'
          },
          {
            name: 'orange',
            nameEn: 'orange',
            colorName: 'orange',
            fileName: 'orangeFr.mp3',
            fileNameEn: 'orangeEn.mp3',
            pawPatrol: 'zuma.jpeg'
          },
          {
            name: 'rose',
            nameEn: 'pink',
            colorName: 'pink',
            fileName: 'roseFr.mp3',
            fileNameEn: 'pink.mp3',
            pawPatrol: 'stella.jpeg',
            robocarpoli: 'ambre.jpg'
          },
          {
            name: 'marron',
            nameEn: 'brown',
            colorName: 'maroon'
          }
        ],
        letters :[
          {
            name:'B',
            fileName:'BFr.mp3'
          },
          {
            name:'C',
            fileName:'CFr.mp3'
          },
          {
            name:'E',
            fileName:'EFr.mp3'
          },
          {
            name:'F',
            fileName:'FFr.mp3'
          },
          {
            name:'G',
            fileName:'GFr.mp3'
          },
          {
            name:'H',
            fileName:'HFr.mp3'
          },
          {
            name:'J',
            fileName:'JFr.mp3'
          },
          {
            name:'K',
            fileName:'KFr.mp3'
          },
          {
            name:'L',
            fileName:'LFr.mp3'
          },
          {
            name:'M',
            fileName:'MFr.mp3'
          },
          {
            name:'N',
            fileName:'NFr.mp3'
          },
          {
            name:'O',
            fileName:'OFr.mp3'
          },
          {
            name:'P',
            fileName:'PFr.mp3'
          },
          {
            name:'R',
            fileName:'RFr.mp3'
          },
          {
            name:'S',
            fileName:'SFr.mp3'
          },
          {
            name:'T',
            fileName:'TFr.mp3'
          },
          {
            name:'V',
            fileName:'VFr.mp3'
          },
          {
            name:'W',
            fileName:'WFr.mp3'
          },
          {
            name:'Y',
            fileName:'YFr.mp3'
          },
          {
            name:'Z',
            fileName:'ZFr.mp3'
          }
        ],

        days: [
          {
            name: 'lundi',
            fileName: 'lundi.mp3'
          },
          {
            name: 'mardi',
            fileName: 'mardi.mp3'
          },
          {
            name: 'mercredi',
            fileName: 'mercredi.mp3'
          },
          {
            name: 'jeudi',
            fileName: 'jeudi.mp3'
          },
          {
            name: 'vendredi',
            fileName: 'vendredi.mp3'
          },
          {
            name: 'samedi',
            fileName: 'samedi.mp3'
          },
          {
            name: 'dimanche',
            fileName: 'dimanche.mp3'
          }
        ],
        numbers: [
          {
            name: 0,
            fileName: 'zeroFr.mp3'
          },
          {
            name: 1,
            fileName: 'unFr.mp3'
          },
          {
            name: 2,
            fileName: 'deux.mp3'
          },
          {
            name: 3,
            fileName: 'trois.mp3'
          },
          {
            name: 4,
            fileName: 'quatre.mp3'
          },
          {
            name: 5,
            fileName: 'cinq.mp3'
          },
          {
            name: 6,
            fileName: 'sixFr.mp3'
          },
          {
            name: 7,
            fileName: 'sept.mp3'
          },
          {
            name: 8,
            fileName: 'huit.mp3'
          },
          {
            name: 9,
            fileName: 'neuf.mp3'
          },
          {
            name: 10,
            fileName: 'dix.mp3'
          }
        ]

      };

      self.categories = {
        colors: {
          sound: {key: "fileName"},
          soundEn: {key: "fileNameEn"},
          pawPatrol: {key: "pawPatrol", gameImg: self.imageFolder + 'pawPatrol/game.png'},
          robocarpoli: {
            key: "robocarpoli",
            gameImg: self.imageFolder + 'robocarpoli/game.jpg',
            type: 'colors'
          },
          viceVersa: {key: "viceVersa", gameImg: self.imageFolder + 'viceVersa/game.jpg'},
          color: {key: 'name', gameImg: self.imageFolder + 'question.jpg'},
          colorEn: {key: 'nameEn'}
        },
        numbers : {
          numbers : {key : 'fileName'}
        },
        days:{
          day : {key : 'fileName'}
        },
        letters:{
          letter : {key : 'fileName'}
        }
      };
    }

    init();
  }
})();
