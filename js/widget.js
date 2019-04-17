
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
		console.log("fetch");
		FB.getLoginStatus(function(response) {
    			if (response.status === 'connected') {
        			var accessToken = response.authResponse.accessToken;
       				 console.log(acessToken);
                	} 
			else{
				  this.facebook.redirect();
			}
    		} ); 

	}
	
}



class facebookModel extends WidgetModel {
	

	constructor() {

		super();

	}

	setUp() {

		super.setUp();
		
	}


	 
    //FB.api('/me/fields=id,name,posts,friends','get', { message: body }, function(response) {
	 //  if (!response || response.error) {
	   //   alert('Error occured');
	    //} 
	  //else{
	   //   alert('Post ID: ' + response.id);
	   // }
	//});
	profile(){
		FB.api(
			'/me',
			'GET',
			{"fields":"id,name,posts,friends"},
			function(response) {
			console.log(response);
			}
		);}
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

		this.try.footer.innerHTML = "login";

		SS.style(this.try.footer, {"userSelect": "none", "cursor": "pointer"});

		Events.on(this.try.footer, "click", event => this.mvc.controller.startClick());

		this.try.stage.appendChild(this.try.footer);
			
	}

	update(title, link) {

		this.link.innerHTML = Facebook;

		//HH.attr(this.link, {"href": "https://graph.facebook.com/105557523954495?fields=id,name,posts,friends&access_token=EAAJU0MYsRokBAMJhUJD3NfMypPt43in7LDr3anLt4V6cwn6c55gZCoaguTBttGXTLs1KyeyUP32FHwTnDFZCjDEDu0FptMEIYsvaOZCxjSlObf1dMA6KoMtSkwnDs5oUTiaj5DEU4cszKpMXYo4vPFlFNTbp1oZD" + link, "target": "_blank"});

	}
}


class facebookController extends WidgetController {
	
	constructor() {

		super();

	}


	setUp() {

		super.setUp();

	    //this.facebook = new FBConnector;
	   // this.facebook.start();
	   // this.FBConnector.load();
    }


    startClick(event){
    	this.facebook = new FBConnector;
	    this.facebook.start();
	    this.facebook.redirect();
	    this.mvc.model.profile();
    }
     
	

	async load() {
      
     let result = await this.mvc.main.dom("EAAJU0MYsRokBAKAYxuF71RnZC9xMkoRkt4k2ypSjj06tFTkZAR9b2gRfHwMyF9Qvie6M8acfzREZC4HcrAkuQV9ZB3sHfqhslebq2m5fWIPYkNFltYi9ymOvsZByfHvOUa6mUkLy4VV8ZCvs9Dtg0ZArVlZBYADTztZCoaq0ctI7ODEP2Hl7yyv8etdjj5YemKsQH1Cq6waLo0gZDZD");

	 let domstr = _atob(result.response.dom); // decode result

	 let parser = new DOMParser(); // init dom parser

	 let dom = parser.parseFromString(domstr, "text/html"); // inject result
         
        let article = new xph().doc(dom).ctx(dom).craft('//*[@id="en-continu"]/pre'); // find interesting things
       // console.log(article.documentElement.lastChild.innerText);
         this.mvc.view.update(article.textContent, article.getAttribute("href"));

	}
}





class FBConnector {

	
	statusChange(response) {

	  if(response.status ==='connected'){

	       this.testAPI();
	       console.log('loggedin and authenticated');

	    } 

	  else{

	       console.log('Please login');
	     

	    }

	}
	
	
	redirect(){
		FB.ui({
			  method: 'pagetab',
			  redirect_uri: 'https://aminouara.github.io/facebookWidget/'
			}, function(response){});

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

          console.log('Thanks for logging in');
        });
    }
}

 



(function(d, s, id){

    var js, fjs = d.getElementsByTagName(s)[0];

    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    (document, 'script', 'facebook-jssdk');
});
