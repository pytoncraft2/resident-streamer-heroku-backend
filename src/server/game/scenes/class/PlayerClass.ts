import { Player, ZoneAttaque } from "../../RoomState"
import { AnimationJoueur, setAnimation } from "../Animations/AnimationJoueur"
import { AnimationEnnemie } from "../Animations/AnimationEnnemie"
import { Aptitudes } from "../Aptitudes/index"

interface Deplacement {
  marche: boolean,
  stop: boolean
}

/**
 * Joueur et interaction
 */

 export default class PlayerClass extends Phaser.Physics.Arcade.Sprite {
   ClientID: any
   sprite: string
   vel: number = 400
   vie: number = 10
   canMove: boolean = true
   attaque: boolean = false
   action: any
   zoneInteraction: any
   etats: any
   etatEnCours: any
   noel: boolean = false
   constructor(
     scene: Phaser.Scene,
     x: number,
     y: number,
     sprite: string,
     ClientID: string
   ) {
     super(scene, x, y, sprite)

     this.init(scene, ClientID)
   }

   init(scene: Phaser.Scene, ClientID: string) {
     this.scene = scene
     this.scene.add.existing(this)
     this.ClientID = ClientID
     this.sprite = (scene as any).room.donnes[this.ClientID].sprite
     this.action = () => {
       console.log("AAAAAAAAAAACTIONNNN !!!!")
     };

     this.etats = {
       'initial': {
         couleur: 16777215,
         vitesse: 600
       },
       'secondaire':
       {
         couleur: 0x000000,
         vitesse: 1400
       }
     }

     // this.displayWidth += 40

     this.etatEnCours = 'initial'



     new AnimationJoueur(this.anims)
     new AnimationEnnemie(this.anims)

     this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject) {
       if (anim.key == 'cross') {
         if (frame.frame.name != 'cross4') {
           this.zoneInteraction.attaque = false
           return
         }
         this.zoneInteraction.attaque = true
       }

       if (anim.key == 'attack') {

         if (frame.frame.name != 'positiona4') {
           this.zoneInteraction.attaque = false
           return
         } else {
           this.zoneInteraction.attaque = true
         }
       }
     })

     this.zoneInteraction = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
     this.zoneInteraction.attaque = false
     this.zoneInteraction.action = (_e) => {
       // _e.vie = 2
       // console.log(_e.etats)
       // _e.setVelocityX(400)
       if (this.noel) {
         _e.fete()
         this.noel = false
       }

       // console.log("VIE OVERLAP ZONE")
       // console.log(_vie_overlap_zone)
       // console.log(_blesse)
       // _blesse = true
       // _vie_overlap_zone = 1
     };
     this.scene.physics.add.existing(this.zoneInteraction);
     this.zoneInteraction.body.enable = false;
     (this.scene as any).playersAttackZone.add(this.zoneInteraction);
     console.log(Aptitudes()['fakhear'])
   }
   preUpdate(time, delta) {
     // console.log(this.anims.msPerFrame += 300)
     super.preUpdate(time, delta);
     const input = (this.scene as any).room.donnes[this.ClientID].clavier
     let { up, right, down, left, space, preparationA, a, directeA, z, e, saut, chargeSaut } = input
     let animationName = this.anims.getFrameName()


     if (this.canMove) {


         this.zoneInteraction.setPosition(this.x + (this.flipX ? -100 : 100), this.y);
       if (a) {
         this.sprite in Aptitudes() && typeof Aptitudes()[this.sprite].toucheA === "function" && Aptitudes()[this.sprite].toucheA(this)
         input['a'] = false
       }

       if (z) {
         this.sprite in Aptitudes() && typeof Aptitudes()[this.sprite].toucheZ === "function" && Aptitudes()[this.sprite].toucheZ(this)
         input['z'] = false
       }

       if (e) {
         this.sprite in Aptitudes() && typeof Aptitudes()[this.sprite].toucheE === "function" && Aptitudes()[this.sprite].toucheE(this)
         input['e'] = false
       }

       if (left) {
         this.deplacement('left', left)
       }

       if (right) {
         this.deplacement('right', right)
       }

     }

     (this.scene as any).room.state.presences.set(
       this.ClientID,
       new Player({ x: this.x, y: this.y, sprite: this.sprite, anim: animationName, flipX: this.flipX, tint: this.tintBottomLeft, vie: this.vie, xa: this.zoneInteraction.x, ya: this.zoneInteraction.y})
     )
   }


   deplacement(direction: 'left'|'right', objet: Deplacement) {
     if (objet.stop) {
       setAnimation(this, 'idle_walk')
       console.log('stop')
       objet.stop = false
       objet.marche = false
       this.setVelocityX(0);
     }
     if (objet.marche) {
       setAnimation(this, 'walk')
       this.setVelocityX(direction == 'right' ? this.vel : -this.vel);
       this.setFlipX(direction == 'right' ? false : true);
       this.setDragX(0)
     }
   }

 }
