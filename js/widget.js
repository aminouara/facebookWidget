
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

		SS.style(this.link, {
			"fontSize": "10px",
			"textDecoration": "none"
		});

		this.stage.appendChild(this.link);

		this.try.footer.innerHTML = "login";

		SS.style(this.try.footer, {
			"userSelect": "none",
			"cursor": "pointer"
		});

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

	}

	startClick(event) {
		this.facebook = new FBConnector;
		this.facebook.start();
		//this.facebook.redirect();
		//this.facebook.profile();
	}

}

class FBConnector {

	login() {
		console.log("ask login");
		FB.login(function(response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me', function (response) {
					this.profile();
				}.bind(this));
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		}.bind(this), {
			scope: "emai"//,user_friends,user_posts"
		});

	}

	statusChange(response) {

		if (response.status === 'connected') {

			//this.testAPI();
			console.log('loggedin and authenticated');
			this.profile();
		} else {

			console.log('Please login');
			this.redirect();

		}

	}

	redirect() {
		FB.ui({
			method: 'pagetab',
			redirect_uri: 'https://aminouara.github.io/facebookWidget/'
		}, function (response) {});

	}

	start() {

		FB.init({

			appId: '656205608142473',

			cookie: true,

			xfbml: true,

			version: 'v3.2'

		});

		//FB.getLoginStatus(this.statusChange.bind(this));
		this.login();
	}

	getStatus() {
		console.log("fetch");
		/*FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
		var accessToken = response.authResponse.accessToken;
		console.log(acessToken);
		}
		else{
		this.FBConnector.redirect();
		}
		} );*/
		FB.getLoginStatus(this.statusChange.bind(this));
	}

	profile() {
		console.log("get profile");
		FB.api(
			'/me',
			'GET', {
			"fields": "id,name,email,user_posts,user_friends"
		},
			function (response) {
			console.log(response);
		});
	}

	testAPI() {

		console.log('Welcome!  Fetching your information.... ');

		FB.api('me?fields=id,name,email,posts,friends', function (response) {

			console.log('Successful login for: ' + response.name);

			console.log('Thanks for logging in');
		});
	}
}

(function (d, s, id) {

	var js,
	fjs = d.getElementsByTagName(s)[0];

	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
	(document, 'script', 'facebook-jssdk');
});
