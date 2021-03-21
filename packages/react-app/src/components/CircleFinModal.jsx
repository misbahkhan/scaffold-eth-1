import React from "react";
import { Modal, Button } from 'antd';

export default function CircleFinModal(props) {
    const [visible, setVisible] = React.useState(false);

    return (
      <>
        <Button onClick={() => setVisible(true)}>
          Bid with USDC
        </Button>
        <Modal
          title="Enter Card Details"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          <p>buttons go here</p>
        </Modal>
      </>
    );
}




