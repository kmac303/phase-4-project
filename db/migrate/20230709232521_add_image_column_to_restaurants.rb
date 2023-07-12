class AddImageColumnToRestaurants < ActiveRecord::Migration[6.1]
  def change
    add_column :reviews do |t|
      t.references :user, foreign_key: true
      t.references :restaurant, foreign_key: true
  end
end