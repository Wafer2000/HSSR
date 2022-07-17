import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

admin.initializeApp();
const firestore = admin.firestore();

const uidAdmin = 'Q82Ekgrmn3fOuPa4sNscu0KKeLj1';

const cors = require('cors')({
    origin: true,
});

exports.newPago = functions.firestore
.document('/Pagos/{PagosId}')
.onCreate( async (event) => {
    
    const pago = event.data();
    console.log('newPago ejecutado');

    const path = '/Usuarios/'+uidAdmin;

    const docInfo = await firestore.doc(path).get();
    const dataUser = docInfo.data() as any;
    const token = dataUser.token;

    const registrationToken =[token];

    const dataFcm = {
        enlace: '/adpagos'
    }

    const notification: Notification = {
        data: dataFcm,
        tokens: registrationToken,
        notification: {
            title: 'Tiene un nuevo Pago',
            body: 'Nuevo Pago por '+pago.canti+', de '+pago.nombres+' '+pago.apellidos
        },
    }

    return sendNotification(notification)
});

exports.newDuda = functions.firestore
.document('/Dudas/{DudasId}')
.onCreate( async (event) => {
    
    const duda = event.data();
    console.log('newDudas ejecutado');

    const path = '/Usuarios/'+uidAdmin;

    const docInfo = await firestore.doc(path).get();
    const dataUser = docInfo.data() as any;
    const token = dataUser.token;

    const registrationToken =[token];

    const dataFcm = {
        enlace: '/respuestas'
    }

    const notification: Notification = {
        data: dataFcm,
        tokens: registrationToken,
        notification: {
            title: 'Tiene una nueva Duda',
            body: 'Nueva Duda de '+duda.nombres+' '+duda.apellidos
        },
    }

    return sendNotification(notification)
});

const sendNotification = (notification: Notification) => {
    return new Promise((resolve) => {
        const message: admin.messaging.MulticastMessage = {
            data: notification.data,
            tokens: notification.tokens,
            notification: notification.notification,
            android: {
                notification: {
                    sound: 'default',
                    icon: 'gs://hssr-2223.appspot.com/icon.png',
                    color: '#34aeeb',
                },
                priority: "high"
            },
            apns: {
                payload: {
                    aps: {
                        sound: {
                            critical: true,
                            name: 'default',
                            volume: 1,
                        }
                    }
                }
            }
        }

        console.log('Lista de los tokens enviados: ', notification.tokens);

        admin.messaging().sendMulticast(message)
        .then((response) => {
            if(response.failureCount>0){
                const failedTokens: any [] = [];
                response.responses.forEach((resp, idx) => {
                    if(!resp.success){
                        failedTokens.push(notification.tokens[idx]);
                    }
                });
                console.log('Lista de los tokens que provocaron errores: '+failedTokens);
            }else{
                console.log('Envio de Notificaciones Exitoso!')
            }
            resolve(true);
            return;
        }).catch(error => {
            console.log('Envio de Fcm a fallado', error);
            resolve(false);
            return;
        });
    })
}

exports.eventPago = functions.firestore
.document('/Pagos/{PagosId}')
.onUpdate( async (event, eventContext) => {

    const userUid = eventContext.params.PagosId;
    const pago = event.after.data();

    const path = '/Pagos/'+userUid;
    const docInfo = await firestore.doc(path).get();
    const dataUser = docInfo.data() as any;
    const uid = dataUser.uid;

    const dataFcm = {
        enlace: '/pagos'
    }

    const path1 = '/Usuarios/'+uid;
    const docInfo1 = await firestore.doc(path1).get();
    const dataUser1 = docInfo1.data() as any;
    const token = dataUser1.token;
    const registrationTokens = [token];

    if(pago.estado==false){
        const notification: Notification = {
            data: dataFcm,
            tokens: registrationTokens,
            notification: {
                title: 'Revision de tu Pago',
                body: 'Tu pago a sido No Autorizado'
            }
        }
        return sendNotification(notification);
    }else if(pago.estado==true){
        const notification: Notification = {
            data: dataFcm,
            tokens: registrationTokens,
            notification: {
                title: 'Revision de tu Pago',
                body: 'Tu pago a sido Autorizado'
            }
        }
        return sendNotification(notification);
    }else{
        return
    }

});

exports.eventDuda = functions.firestore
.document('/Dudas/{DudasId}')
.onUpdate( async (event, eventContext) => {

    const userUid = eventContext.params.DudasId;
    const pago = event.after.data();

    const path = '/Dudas/'+userUid;
    const docInfo = await firestore.doc(path).get();
    const dataUser = docInfo.data() as any;
    const uid = dataUser.uidresi;

    const dataFcm = {
        enlace: '/preguntas'
    }

    const path1 = '/Usuarios/'+uid;
    const docInfo1 = await firestore.doc(path1).get();
    const dataUser1 = docInfo1.data() as any;
    const token = dataUser1.token;
    const registrationTokens = [token];

    if(pago.estado==true){
        const notification: Notification = {
            data: dataFcm,
            tokens: registrationTokens,
            notification: {
                title: 'Revision de tu Duda',
                body: 'Tu duda a sido contestada'
            }
        }
        return sendNotification(notification);
    }else{
        return
    }

});

export const newNoticia = functions.https.onRequest((request, response) => {
    return cors(request, response, async () => {
        if(request.body.data){
            const notification = request.body.data as Notification;
            await sendNotification(notification);
            const res = {
                respuesta: 'success'
            };
            response.status(200).send(res);
        }else{
            const res = {
                respuesta: 'error'
            };
            response.status(200).send(res);
        }
    });
});

interface Notification {
    data: any;
    tokens: string[];
    notification: admin.messaging.Notification;
}