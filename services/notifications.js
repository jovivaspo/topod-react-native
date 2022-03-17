import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  })
  
  async function schedulePushNotification(title, body, url='url') {
   
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { url},
      },
      trigger: { seconds: 2 },
    });
  }

  export {schedulePushNotification}