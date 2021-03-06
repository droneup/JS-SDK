import Utils from '../utils'
import Urls from '../urls'
import Request from '../request'

const channelProperties = {}

export function getChannelProperties(channelName, asyncHandler) {
  const responder = Utils.extractResponder(arguments)
  const isAsync = !!responder

  const props = channelProperties[channelName]

  if (props) {
    if (isAsync) {
      asyncHandler.success(props)
    }

    return props
  }

  const result = Request.get({
    url         : Urls.messagingChannelProps(channelName),
    isAsync     : isAsync,
    asyncHandler: responder
  })

  channelProperties[channelName] = result

  return result
}
