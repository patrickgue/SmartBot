package ch.patrickguenthard.graph.model

import ch.patrickguenthard.graph.model.intf.PropertyValue

/**
  * Created by Patrick on 08.12.2016.
  */
class Property(keyParam:String, propertyValueParam:PropertyValue) {
  var key:String = keyParam
  var propertyValue:PropertyValue = propertyValueParam
}
