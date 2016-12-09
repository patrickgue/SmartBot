package ch.patrickguenthard.graph.persistence

import ch.patrickguenthard.graph.graphutil.GraphUtil
import ch.patrickguenthard.graph.model.{Edge, Vertex}

import scala.collection.mutable

/**
  * Created by guenthard on 12/9/16.
  */
object GraphPersistance {
  def loadGraph():Vertex = {
    var str:String = PersistenceUtil.readFile()
    var listStr:Array[String] = str.split("\n")
    var listVtx:mutable.Map[String,Vertex] = mutable.HashMap[String,Vertex]()
    var fakeBaseVertex:Vertex = null

    for(lstr:String <- listStr) {
      var name:String = lstr.split(":")(0)
      listVtx += name -> new Vertex(name)
    }

    for(lstr:String <- listStr) {
      val splitedStr:Array[String] = lstr.split(":")
      var name:String = splitedStr(0)
      if(splitedStr.length > 1) {
        var realtionsString:String = lstr.split(":")(1)
        var relationVertexNames:Array[String] = realtionsString.split(",")
        for(relationName:String <- relationVertexNames) {
          listVtx(name).addVertex(listVtx(relationName))
        }
      }
    }

    listVtx.head._2
  }

  def saveGraph(vertex:Vertex) = {
    var outString:String = ""
    GraphUtil.processAll(vertex, (vrt) => {
      outString += vrt.name + ":"
      var first:Boolean = true
      for(eou:Edge <- vrt.outEdges) {
        if(!first) outString += ","
        else first = false

        outString += eou.toVertex.name
      }
      outString += "\n"
      println(vrt.name)
      true
    })
    GraphUtil.resetVisited(vertex)
    PersistenceUtil.saveFile(outString)
  }
}
