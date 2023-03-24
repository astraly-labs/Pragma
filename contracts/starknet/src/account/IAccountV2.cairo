#[contract]

use openzeppelin_contracts::account::AccountCallArray;


trait IAccount {
    fn getPublicKey() ->felt;
    fn supportsInterface(interfaceID: felt) -> bool;

    //
    //Setters 
    //

    fn setPublicKey(publicKey: felt);

    //
    //Business Logic
    //

    fn isValidSignature(hash:felt,signature: Array::<felt>) -> bool;

    fn __validate__(call_array: Array::<AccountCallArray>, calldata:Array::<felt>) -> bool;

    fn __validate_declare__(class_hash:felt);

    fn __execute__(call_array: Array::<AccountCallArray>, calldata:Array::<felt>) -> Array::<felt>;

}