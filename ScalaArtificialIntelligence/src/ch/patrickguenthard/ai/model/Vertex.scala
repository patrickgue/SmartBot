package ch.patrickguenthard.ai.model

import scala.collection._

/**
  * Created by Patrick on 08.12.2016.
  */
class Vertex(aname:String) {
  var name:String = aname
  var properties:mutable.MutableList[Property] = mutable.MutableList[Property]()
  var inEdges:mutable.MutableList[Edge] = mutable.MutableList[Edge]()
  var outEdges:mutable.MutableList[Edge] = mutable.MutableList[Edge]()
  var visited = false

  def addVertex(newVertex:Vertex) = {
    var edge = new Edge(this, newVertex)
    outEdges += edge
    newVertex.inEdges += edge
  }

  def addProperty(str:String, obj:Any) = {
    properties += new Property(str,obj)
  }
}
