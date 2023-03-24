#[contract]
use array::ArrayTrait;
use option::OptionTrait;

trait IProxy {
    //
    //Fallback functions
    //

    #[external]
    #[raw_input]
    #[raw_output]
    fn __default__(selector: felt, calldata: Array::<felt>) -> Array::<felt>;
    #[external]
    #[l1_handler]
    #[raw_input]
    fn __l1_default__(selector: felt, calldata: Array::<felt>);
}
