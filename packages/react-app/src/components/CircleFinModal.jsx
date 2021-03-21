import React from "react";
import { Modal, Button } from 'antd';
import uuidv4 from 'uuid';
import openPGP from '../lib/openpgp'
import { getLive } from '../lib/apiTarget'
import { exampleCards } from '../lib/cardTestData'
import { default as cardsApi } from '../lib/cardsApi'
import { CreateCardPaymentPayload } from '../lib/paymentsApi'
import {
  CreateMarketplaceCardPaymentPayload,
  MarketplaceInfo,
} from '../lib/marketplaceApi'


export default function CircleFinModal(props) {
    const [visible, setVisible] = React.useState(false);

    const exampleCard = exampleCards[0]

    const makePayment = () => {
        console.log ('making payments');

        const payload = {
            idempotencyKey: uuidv4(),
            expMonth: parseInt(exampleCard.formData.expiry.month),
            expYear: parseInt(exampleCard.formData.expiry.year),
            keyId: '',
            encryptedData: '',
            billingDetails: {
              line1: exampleCard.formData.line1,
              city: exampleCard.formData.city,
              postalCode: exampleCard.formData.postalCode,
              country: exampleCard.formData.country,
              name: exampleCard.formData.name,
            },
            metadata: {
              sessionId: 'xxx',
              ipAddress: '172.33.222.1',
            },
          }

          try {
            const publicKey = cardsApi.getPCIPublicKey()
            const cardDetails = {
              number: exampleCard.formData.cardNumber.replace(/\s/g, ''),
              cvv: exampleCard.formData.cvv,
            }
            const encryptedData = openPGP.encrypt(cardDetails, publicKey)
            const { encryptedMessage, keyId } = encryptedData
            payload.keyId = keyId
            payload.encryptedData = encryptedMessage
            return cardsApi.createCard(payload)
          } catch (error) {
              console.log(error)
          }

        // setVisible(false)
    }

    return (
      <>
        <Button onClick={() => setVisible(true)}>
          Bid with USDC
        </Button>
        <Modal
          title="Enter Card Details"
          centered
          visible={visible}
          onOk={() => makePayment()}
          onCancel={() => setVisible(false)}
        >
          <p>buttons go here</p>
        </Modal>
      </>
    );
}
