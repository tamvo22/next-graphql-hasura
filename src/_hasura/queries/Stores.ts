query getStores() {
  stores {
    id
    name
    address
  }
}

query getStoreById($id: String!) {
  stores_by_pk(id: $id) {
    id
    name
    address
    created_at
  }
}

query getStore_Inventory($id: String!) {
  stores {
    name
    id
    created_at
    address
    inventory {
      id
      product_id
      stock_quantity
      store_id
    }
  }
}

mutation addStore($object: stores_insert_input!) {
  insert_stores(object: $object) {
    returning {
      id
      created_at
      name
      address
    }
  }
}

mutation addStore($props) {
  insert_stores(object: $object) {
    returning {
      id
      created_at
      name
      address
    }
  }
}

mutation addStore($object) {
  insert_stores(object: $object) {
    returning {
      id
      created_at
      name
      address
    }
  }
}



