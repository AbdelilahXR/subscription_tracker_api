import dayjs from 'dayjs';
import {createRequire} from 'module';
import Subscription from '../models/subscription.model';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');


const REMINDERS = [7, 5, 2, 1];

export default sendReminders = serve(async () => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription !== 'active'){
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow. `);
        return;
    }   

    for (const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if(reminderDate.isAfter(dayjs())){

        }
        
    }
});




const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}
