import TJoueur from "../types/Joueur";
export function __StatsSupplementaire(boss_1: any, Aptitudes: any) {
  Aptitudes[boss_1.sprite].toucheDroite = function (_boss_1: any) {
    boss_1.setVelocityX(400)
  }
  Aptitudes[boss_1.sprite].toucheGauche = function (_boss_1: any) {
    boss_1.setVelocityX(-400)
  }

  // const colision = boss_1.scene.physics.add.collider(boss_1.scene.players, boss_1)
  var compteurAttaque: number = 0;
  boss_1.scene.physics.add.collider(boss_1.scene.players, boss_1,
    function (_ennemie: any, _joueur: any) {
      if (_ennemie.body.touching.right)
      {
        compteurAttaque += 1
        // attaquePuisDeplacement(boss_1, boss_1.flipX == true && boss_1.blesse, 0xff0000, false, aptitudes)
        if (compteurAttaque > 3) {
          _ennemie.play("attaque")
          compteurAttaque = 0;
        }

        if (_ennemie.flipX) {
          _ennemie.setFlipX(false);
          _ennemie.play("attaque")
        }
      }
      else if (boss_1.body.touching.left)
      {
        compteurAttaque += 1
        if (compteurAttaque > 3) {
          _ennemie.play("attaque")
          compteurAttaque = 0;
        }

        if (!_ennemie.flipX) {
          _ennemie.setFlipX(true);
          _ennemie.play("attaque")
        }
      }

      // _ennemie.dommage(_joueur.getData('degat'))
      // _joueur.dommage(1)
      // console.log(_ennemie.blesse_opposant)
      // console.log(_joueur.blesse_opposant)
      // console.log("COLISION JOUEUR BOSS_1!!")
    }, null, this);

  // boss_1.scene.time.delayedCall(500, () => {
    // boss_1.scene.physics.world.removeCollider(colision);
  // }, null, this);
}

export function pique__A(boss_1: Phaser.Physics.Arcade.Sprite|any, input) {
  boss_1.play('attaque')
  input.a = false
}

export function suivre__Z(boss_1: Phaser.Physics.Arcade.Sprite|any) {
  if (boss_1.scene.players.getLength() > 1)
  {
    boss_1.scene.physics.moveToObject(boss_1, boss_1.scene.physics.closest(boss_1, [...(boss_1.scene as any).players.getChildren()]), 600);
  }
}

export function __auto(boss_1: Phaser.Physics.Arcade.Sprite|any, input: any, aptitudes: any) {
  if (boss_1 && boss_1.body) {
    // console.log("BOUCLE OK")
    // console.log(boss_1.body.touching)
    // if (boss_1.body.touching.right) {
    //   // attaquePuisDeplacement(boss_1, boss_1.flipX == true && boss_1.blesse, 0xff0000, false, aptitudes)
    //   console.log("TOUCHING DROITE !!")
    // } else if (boss_1.body.touching.left) {
    //   console.log("TOUCHING GAUCHE !!")
    //   // attaquePuisDeplacement(boss_1, boss_1.flipX == false && boss_1.blesse, 0xff0000, true, aptitudes)
    // }
    if (boss_1.scene.players.getLength() > 0 && boss_1)
    {
      let joueuProche = boss_1.scene.physics.closest(boss_1, [...(boss_1.scene as any).players.getChildren()])
      if (joueuProche) boss_1.scene.physics.moveToObject(boss_1, joueuProche, 800);
    }
  // boss_1.play('attaque')
  reactiveBoucle(boss_1, aptitudes)
  } else {
  reactiveBoucle(boss_1, aptitudes)
  }
}

function attaquePuisDeplacement(boss_1, condition, couleur, directionFinal, aptitudes) {
  // if (condition) {
  //   boss_1.setTint(couleur)
  //   boss_1.vie -= 1
  // }
  // boss_1.scene.tweens.addCounter({
  //   from: 0,
  //   to: 1,
  //   duration: 200,
  //   onComplete: () => (boss_1.setTint(0x000000), boss_1.blesse = false),
  //   repeat: 0,            // -1: infinity
  //   yoyo: false,
  // })
  boss_1.play('attaque')
  // boss_1.on('animationcomplete', () => {
  boss_1.scene.physics.moveToObject(boss_1, boss_1.scene.physics.closest(boss_1, [...(boss_1.scene as any).players.getChildren()]), 800);
    // boss_1.anims.play('deplacement');
  boss_1.setFlipX(directionFinal)
  // reactiveBoucle(boss_1, aptitudes)
  // });
}

function reactiveBoucle(boss_1: TJoueur, aptitudes: any) {
  boss_1.scene.time.delayedCall(500, () => {
    boss_1.play('deplacement');
    __auto(boss_1, {}, aptitudes)
  }, null, this);
}
