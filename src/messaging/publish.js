import Backendless from '../bundle'
import Utils from '../utils'
import Urls from '../urls'
import DeliveryOptions from './delivery-options'
import PublishOptions from './publish-options'

export function publish(channelName, message, publishOptions, deliveryTarget/**, async */) {
  const responder = Utils.extractResponder(arguments)
  const isAsync = !!responder

  const data = {
    message: message
  }

  if (publishOptions && publishOptions !== responder) {
    if (!(publishOptions instanceof PublishOptions)) {
      throw new Error('Use PublishOption as publishOptions argument')
    }

    Utils.deepExtend(data, publishOptions)
  }

  if (deliveryTarget && deliveryTarget !== responder) {
    if (!(deliveryTarget instanceof DeliveryOptions)) {
      throw new Error('Use DeliveryOptions as deliveryTarget argument')
    }

    Utils.deepExtend(data, deliveryTarget)
  }

  return Backendless._ajax({
    method      : 'POST',
    url         : Urls.messagingChannel(channelName),
    isAsync     : isAsync,
    asyncHandler: responder,
    data        : JSON.stringify(data)
  })
}
