export const DefautStats = (personnage?: any) => {
      personnage.vie = 10;
      personnage.degat = 1;
}

export const DefautDirection = (Aptitudes: any, personnage: any) => {
  Aptitudes[personnage.sprite].toucheDroite = (personnage: any, input: any) => {
      personnage.setVelocityX((personnage as any).vel);
      personnage.setDragX(1400)
      if (personnage.flipX) personnage.setFlipX(false);
      // if (input.space) {
      //   personnage.play('jump', true)
      //   personnage.setVelocityY(-1400);
      // } else {
      //   personnage.play('walk', true)
      // }
      if (input.right && !personnage.survole) {
        personnage.play('walk', true)
      }
      if (input.right_fin && !personnage.survole) {
        personnage.play('idle_walk')
      }
      // console.log("FIN ? SPACE")
      // console.log(input.space_fin)

      // if (input.right_fin && !input.space)
      // {
      //   personnage.play('idle_walk')
      //   personnage.setDragX(8400)
      // }
    }
  Aptitudes[personnage.sprite].toucheGauche = (personnage: any, input: any) => {
      personnage.setVelocityX(-(personnage as any).vel);
      personnage.setDragX(1400)
      if (!personnage.flipX) personnage.setFlipX(true);
      // if (input.space) {
      //   personnage.play('jump', true)
      //   personnage.setVelocityY(-1400);
      // } else {
      //   personnage.play('walk', true)
      // }
      if (input.left && !personnage.survole) {
        personnage.play('walk', true)
      }
      if (input.left_fin && !personnage.survole) {
        personnage.play('idle_walk')
      }

      // if (input.left_fin && !input.space)
      // {
      //   personnage.setDragX(8400)
      //   personnage.play('idle_walk')
      // }
    }
    Aptitudes[personnage.sprite].toucheEspace = (personnage: Phaser.Physics.Arcade.Sprite, input: any) => {
      personnage.setVelocityY(-500);
    }
}
