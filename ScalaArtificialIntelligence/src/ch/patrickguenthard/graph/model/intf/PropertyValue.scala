package ch.patrickguenthard.graph.model.intf

/**
  * Created by Patrick on 09.12.2016.
  */
trait PropertyValue {
  def parse(str:String)
  def saveString():String
}
