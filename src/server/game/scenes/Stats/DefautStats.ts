export const DefautStats = (personnage?: any) => {
      personnage.vie = 10;
      personnage.degat = 1;
}

export const DefautDirection = (aptitudes: any, personnage: any) => {
  aptitudes[personnage.sprite].toucheDroite = (personnage: Phaser.Physics.Arcade.Sprite, input: any) => {
      console.log("DROITE")
      personnage.setVelocityX((personnage as any).vel);
      personnage.setDragX(1400)
      if (personnage.flipX) personnage.setFlipX(false);
      if (input.space) {
        personnage.play('jump', true)
        personnage.setVelocityY(-1400);
      } else {
        personnage.play('walk', true)
      }

      if (input.right_fin && !input.space)
      {
        personnage.play('idle_walk')
        personnage.setDragX(8400)
      }
    }
  aptitudes[personnage.sprite].toucheGauche = (personnage: Phaser.Physics.Arcade.Sprite, input: any) => {
      personnage.setVelocityX(-(personnage as any).vel);
      personnage.setDragX(1400)
      if (!personnage.flipX) personnage.setFlipX(true);
      if (input.space) {
        personnage.play('jump', true)
        personnage.setVelocityY(-1400);
      } else {
        personnage.play('walk', true)
      }
      if (input.left_fin && !input.space)
      {
        personnage.setDragX(8400)
        personnage.play('idle_walk')
      }
    }
}
