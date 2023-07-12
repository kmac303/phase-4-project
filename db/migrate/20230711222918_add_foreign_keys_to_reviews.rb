class AddForeignKeysToReviews < ActiveRecord::Migration[6.1]
  def change
    change_table :reviews do |t|
      t.references :user, foreign_key: true
      t.references :restaurant, foreign_key: true
    end
  end
end
