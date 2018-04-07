class AddIndex1ToUsers < ActiveRecord::Migration[5.0]
  def up
    add_index :users, :name
  end

  def down
    add_index :users, :name, :string
  end
end
