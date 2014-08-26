var app = module.exports = require('appjs');

app.serveFilesFrom(__dirname + '/content');

var menubar = app.createMenu([{
  label:'&Arquivo',
  submenu:[
    {
      label:'E&xit',
      action: function(){
        window.close();
      }
    }
  ]
},{
  label:'&Janela',
  submenu:[
    {
      label:'Tela Cheia',
      action:function(item) {
        window.frame.fullscreen();
        console.log(item.label+" called.");
      }
    },
    {
      label:'Minimizar',
      action:function(){
        window.frame.minimize();
      }
    },
    {
      label:'Maximizar',
      action:function(){
        window.frame.maximize();
      }
    },{
      label:''//separator
    },{
      label:'Restaurar',
      action:function(){
        window.frame.restore();
      }
    }
  ]
}]);

menubar.on('select', function(item){
  console.log("menu item "+item.label+" clicked");
});

var trayMenu = app.createMenu([{
  label:'Show',
  action:function(){
    window.frame.show();
  },
},{
  label:'Minimize',
  action:function(){
    window.frame.hide();
  }
},{
  label:'Exit',
  action:function(){
    window.close();
  }
}]);

var statusIcon = app.createStatusIcon({
  icon:'./data/content/icons/32.png',
  tooltip:'AppJS Hello World',
  menu:trayMenu
});

var window = app.createWindow({
  width  : 800,
  height : 800,
  icons  : __dirname + '/content/icons'
});

window.on('create', function(){
  console.log("Window Created");
  window.frame.show();
  window.frame.center();
  window.frame.setMenuBar(menubar);
});

window.on('ready', function(){
  console.log("Window Ready");
  window.process = process;
  window.module = module;

  function F12(e){ return e.keyIdentifier === 'F12' }
  function Command_Option_J(e){ return e.keyCode === 74 && e.metaKey && e.altKey }

  window.addEventListener('keydown', function(e){
    if (F12(e) || Command_Option_J(e)) {
      window.frame.openDevTools();
    }
  });
});

window.on('close', function(){
  console.log("Window Closed");
});
