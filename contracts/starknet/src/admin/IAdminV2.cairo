#[contract]

trait IAdmin {

    //
    //Getters
    //

    fn get_admin_address() -> felt;

    //
    //Setters
    //

    fn set_admin_address(new_address: felt);
}