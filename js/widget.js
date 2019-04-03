class facebookWidget extends Widget {
	
	constructor(id, app) {
		super(id, facebookModel, facebookView, facebookController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = true;
		this.sizeX = 2;
		this.sizeY = 1;
		this.radius = 15;
	}
	
	async ready() {
		super.ready();
		SocketIO.initialize();
		trace(this);
		SocketIO.on("msg", this.mvc.controller.onMessage.bind(this));
		this.mvc.controller.load();
	}
	
}

class facebookModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

}

class facebookView extends WidgetView {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

	draw() {
		super.draw();
		this.link = HH.create("a");
		SS.style(this.link, {"fontSize": "10px", "textDecoration": "none"});
		this.stage.appendChild(this.link);
		
		this.try.footer.innerHTML = "test socket";
		SS.style(this.try.footer, {"userSelect": "none", "cursor": "pointer"});
		Events.on(this.try.footer, "click", event => this.mvc.controller.socketClick());
		this.try.stage.appendChild(this.try.footer);
	}
	
	update(title, link) {
		this.link.innerHTML = Facebook;
		//HH.attr(this.link, {"href": "https://www.lemonde.fr" + link, "target": "_blank"});
	}
	
}

class facebookController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();

		this.facebook = new FBConnector();
                 this.facebook.start();

        }

  

		

	
	onMessage(data) {
		trace("received socket msg", data);
	}
	
	socketClick(event) {
		trace("test socket");
		SocketIO.send("msg", {test: "message"});
	}
	
//	async load() {
	//	let result = await this.mvc.main.dom("https://lemonde.fr"); // load web page
	//	let domstr = _atob(result.response.dom); // decode result
	//	let parser = new DOMParser(); // init dom parser
		//let dom = parser.parseFromString(domstr, "text/html"); // inject result
		//let article = new xph().doc(dom).ctx(dom).craft('//*[@id="en-continu"]/div/ul/li[1]/a').firstResult; // find interesting things
	//	this.mvc.view.update(article.textContent, article.getAttribute("href"));
	//}
	
}


class FBConnector {


  //constructor() {
//	  super();
 // }

	
 statusChange(response) {
   if(response.status ==='connected'){
        this.testAPI();
        console.log('loggedin and authenticated');
  } 
   else{
  
  document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

   start() {
FB.init({
      appId      : '656205608142473',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.2'
    });


 FB.getLoginStatus(this.statusChange.bind(this));  

   }


testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('me?fields=id,name,email,posts,friends', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
}
 




(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   (document, 'script', 'facebook-jssdk'));
  }
