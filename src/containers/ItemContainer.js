import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { getItem } from "../actions/itemActions";
import { addItemToCart } from "../actions/cartActions";
import ItemArea from "../components/ItemArea";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import C from "../constants";
import Box from "@material-ui/core/Box";

export function ItemContainer({ itemData, getItem, addItemToCart }) {
  const { id } = useParams();

  useEffect(() => {
    getItem(id);
  }, [getItem, id]);

  return itemData.loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <NavBar back={true} text={itemData.item.name} search={false} />
      <Box p={5} mt={5}>
        <ItemArea
          initialValues={itemData.extraValues}
          item={itemData.item}
          orderId={window.localStorage.getItem(C.ORDER_ID)}
          addItemToCart={addItemToCart}
        />
      </Box>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    itemData: state.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItem: (id) => dispatch(getItem(id)),
    addItemToCart: (orderId, itemId, quantity, extrasId) =>
      dispatch(addItemToCart(orderId, itemId, quantity, extrasId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
