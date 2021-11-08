<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = 'Evelyn';
        $user->lastname = 'Pombal';
        $user->email = 'evelyn@hotmail.com';
        $user->password = bcrypt('12345678');
        $user->save();

        $user = new User();
        $user->name = 'Luana';
        $user->lastname = 'Ribeiro';
        $user->email = 'luana@hotmail.com';
        $user->password = bcrypt('12345678');
        $user->save();
        
        $user = new User();
        $user->name = 'Daniella';
        $user->lastname = 'Fontana';
        $user->email = 'daniella@hotmail.com';
        $user->password = bcrypt('12345678');
        $user->save();

        $user = new User();
        $user->name = 'Ana Carolina';
        $user->lastname = 'Lima';
        $user->email = 'carol@hotmail.com';
        $user->password = bcrypt('12345678');
        $user->save();

        $user = new User();
        $user->name = 'Sheicy';
        $user->lastname = 'Alves';
        $user->email = 'sheicy@hotmail.com';
        $user->password = bcrypt('12345678');
        $user->save();

    }
}
