package ch.patrickguenthard.ai.persistence

import ch.patrickguenthard.ai.model.Vertex

import scala.collection.mutable

/**
  * Created by guenthard on 12/9/16.
  */
object GrahpPersistance {
  def loadGraph():Vertex = {
    var str:String = PersistenceUtil.readFile()
    var listStr:Array[String] = str.split("\n")
    var listVtx:mutable.MutableList[Vertex] = mutable.MutableList[Vertex]()
    for(lstr:String <- listStr) {

      var name:String = lstr.split(":")
    }
    new Vertex("")
  }
}
