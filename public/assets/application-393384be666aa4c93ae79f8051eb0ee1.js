define(["marionette","controllers/MainController","handlebars","router","models/user"],function(e,r,n,t,o){return Backbone.Marionette.TemplateCache.prototype.compileTemplate=function(e){return n.compile(e)},window.Shredhub=new e.Application,Shredhub.addRegions({header:"#header",main:"#main",modal:"#modal",footer:"#footer"}),Shredhub.addInitializer(function(){n.registerHelper("equal",function(e,r,n){if(arguments.length<3)throw new Error("Handlebars Helper equal needs 2 parameters");return e!=r?n.inverse(this):n.fn(this)})}),Shredhub.addInitializer(function(){$.ajaxSetup({beforeSend:function(e){e.setRequestHeader("X-CSRF-Token",$('meta[name="csrf-token"]').attr("content"))}})}),Shredhub.addInitializer(function(e){window.router=new t({controller:e.controller}),Backbone.history.start()}),Shredhub.addInitializer(function(){window.user&&(Shredhub.user=new o(window.user),Shredhub.user.initUser(window.user))}),window.mainController=new r,Shredhub.start({controller:mainController}),Shredhub});