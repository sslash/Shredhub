define([
  'marionette',
  'handlebars',
  'bootstrap',

  'text!templates/battle.hbs',
  'popcorn'
  ], function (Marionette, Handlebars,bs, tpl) {

    BattleView = Backbone.Marionette.ItemView.extend({
      template: Handlebars.compile(tpl),

      ui : {
        audio : '#audioFile'
      },

      mediaTags : [
        '#leftVideoFile1',
        '#rightVideoFile1',
        '#audioFile',
        '#leftVideoFile2',
        '#rightVideoFile2',
        '#leftVideoFile3',
        '#rightVideoFile3'
      ],

      visitObj : {
        waitTime : 0,
        thisObj : {}
      },

      onDomRefresh : function() {
        this.startBarrier();
      },

      startBarrier : function() {
        console.log("starting barriesr");
        var that = this;
        that.countDownLatch = 7;
        for ( var i = 0; i < this.mediaTags.length; i++) {
          $(this.mediaTags[i]).on("canplay", function(){
            that.countDownLatch -= 1;
            console.log("stress");
            if ( that.countDownLatch === 0) {
              that.playBattle();
            }
          });
        }
      },

      playBattle : function() {
        console.log("starting battle");
        var visitObjs = [
        {
          pre : function(){},
          waitTime : 1400,
          thisObj : this.ui.audio[0]
        },
        {
          pre : function(){},
          waitTime : 0,
          thisObj : Popcorn('#leftVideoFile1')
        },
        {
          pre : function(){},
          waitTime : 5700,
          thisObj : Popcorn('#rightVideoFile1')
        },
        {
          pre : this.toggle,
          hideTag : "#leftVideoFile1",
          showTag : '#leftVideoFile2',
          waitTime : 10800,
          thisObj : Popcorn('#leftVideoFile2')
        },
        {
          pre : this.toggle,
          hideTag : "#rightVideoFile1",
          showTag : '#rightVideoFile2',
          waitTime : 22600,
          thisObj : Popcorn('#rightVideoFile2')
        },
        {
          pre : this.toggle,
          hideTag : "#leftVideoFile2",
          showTag : '#leftVideoFile3',
          waitTime : 34500,
          thisObj : Popcorn('#leftVideoFile3')
        },
        {
          pre : this.toggle,
          hideTag : "#rightVideoFile2",
          showTag : '#rightVideoFile3',
          waitTime : 40200,
          thisObj : Popcorn('#rightVideoFile3')
        }];

        for ( var i = 0; i < visitObjs.length; i ++) {
          this.waitAndExec(visitObjs[i]);
          this.waitAndPlay(visitObjs[i]);
        }
      },

      toggle : function(show, hide) {
        $(hide).hide();
        $(show).show();
      },

      play : function(tagAdd, tagRm, src) {
        this.waitAndPlay(0, tagAdd);
      },

      waitAndExec : function(visitObj){
        setTimeout(function() {
          visitObj.pre(visitObj.showTag, visitObj.hideTag);
        },visitObj.waitTime - 500);
      },

      waitAndPlay : function(visitObj) {
        setTimeout(function() {
          visitObj.thisObj.play();
        },visitObj.waitTime);
      }
    });

    return BattleView;
});

