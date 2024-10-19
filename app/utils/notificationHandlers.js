import { Text } from "react-native"
export const getNotificationsApiOptions = (
  accessToken,
  notificationType,
  notificationId = "",
  loanId = "",
  eventId = "",
  senderId = ""
) => {
  console.log("------- the eventid", eventId)

  const options = {
    lendingInitiated: {
      accept: [
        "/loans/accept-lending",
        {
          method: "POST",
          body: JSON.stringify({ notificationId }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ],
      refuse: [
        "/loans/refuse-lending",
        {
          method: "POST",
          body: JSON.stringify({ notificationId, loanId }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ],
    },
    loansSettlementRequest: {
      accept: [
        `/loans/accept-settling-down/${senderId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ],
      refuse: [
        `/loans/refuse-settling-down/${senderId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ],
    },
    eventInvitation: {
      accept: [
        `/events/accept-event/${eventId}`,
        {
          method: "POST",
          body: JSON.stringify({ notificationId }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ],
      refuse: [
        `/events/refuse-event/${eventId}`,
        {
          method: "POST",
          body: JSON.stringify({ notificationId }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ],
    },
    // not checked yet:
    userPaidEvent: {
      accept: [
        `/events/accept-event-as-paid/${eventId}`,
        {
          method: "PUT",
          body: JSON.stringify({ notificationId }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ],
      refuse: [
        `/events/refuse-event-as-paid/${eventId}`,
        {
          method: "PUT",
          body: JSON.stringify({ notificationId }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ],
    },
    paymentReceived: {
      accept: [
        "/loans/accept-paid-lending",
        {
          method: "POST",
          body: JSON.stringify({ notificationId, loanId }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ],
      //! there is something wrong with this
      //   refuse: ["/loans/refuse-paid-lending", {
      //     body: JSON.stringify({ notificationId, loanId }),
      //     headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //     },
      //   }],
    },
  }

  return options[notificationType] || []
}

export const makeMessage = (senderName, type, title, amount = "") => {
  const messages = {
    eventCanceled: (
      <Text>
        The event <Text className="font-bold">{title}</Text> has been canceled.
        Please acknowledge this update.
      </Text>
    ),
    paymentReceived: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has sent a payment for
        your loan. Please confirm receipt.
      </Text>
    ),
    eventInvitation: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has invited you to the
        event <Text className="font-bold">"{title}"</Text> with an amount of{" "}
        {amount}. Do you accept this invitation?
      </Text>
    ),
    lendingInitiated: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has created a loan
        request of <Text className="font-bold">{title}</Text>. Do you accept
        this transaction?
      </Text>
    ),
    successfullyPaid: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has confirmed that the
        loan <Text className="font-bold">"{title}"</Text> has been fully paid.
        The transaction is now closed.
      </Text>
    ),
    borrowingInitiated: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has declared that you
        have lent them money.
      </Text>
    ),
    refusedPayment: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has refused your payment
        declaration for the loan <Text className="font-bold">"{title}"</Text>.
        They state that the debt has not been fully cleared. Please resolve this
        disagreement.
      </Text>
    ),
    memberRefused: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has declined the
        invitation to join the event as a member. Your participation has been
        canceled.
      </Text>
    ),
    eventUpdated: (
      <Text>
        The event <Text className="font-bold">"{title}"</Text> has been updated.
        Please review the changes and confirm your participation.
      </Text>
    ),
    refuseLending: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has refused your lending
        declaration. The transaction has not been accepted.
      </Text>
    ),
    userPaidEvent: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has declared that the
        payment for the event has been completed.
      </Text>
    ),
    adminDeclinedPaying: (
      <Text>
        The admin (<Text className="font-bold">{senderName}</Text>) has declined
        your payment declaration for the event "{title}". Please review and
        update the payment details.
      </Text>
    ),
    loansSettlementRequest: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has requested to settle
        the loans with you. Please review and confirm the settlement details.
      </Text>
    ),
    loansSettlementRefused: (
      <Text>
        <Text className="font-bold">{senderName}</Text> has refused your loan
        settlement request. Please review the details and consider discussing
        the terms.
      </Text>
    ),
  }
  return messages[type]
}
