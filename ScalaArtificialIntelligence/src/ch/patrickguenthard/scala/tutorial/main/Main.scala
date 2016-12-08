package ch.patrickguenthard.scala.tutorial.main

import ch.patrickguenthard.ai.graphutil.GraphUtil
import ch.patrickguenthard.ai.model.Vertex
//import ch.patrickguenthard.ai.persistence.PersistenceUtil


/**
  * Created by Patrick on 03.12.2016.
  */
object Main {
  def main(args: Array[String]): Unit = {
    var baseVertex:Vertex = new Vertex("Test")
    var a = new Vertex("Alpha")
    var b = new Vertex("Bravo")
    var c = new Vertex("Charlie")
    var d = new Vertex("Delta")
    var e = new Vertex("Echo")

    e.addVertex(d)
    a.addVertex(e)
    c.addVertex(e)
    baseVertex.addVertex(a)
    baseVertex.addVertex(b)
    baseVertex.addVertex(c)

    GraphUtil.processAll(baseVertex, (vtx:Vertex) => {
      var str:String = vtx.name + " | {"
      for(out <- vtx.outEdges) {
        str += out.toVertex.name + ", "
      }
      str += "}{"
      for(in <- vtx.inEdges) {
        str += in.fromVertex.name + ", "
      }
      str += "}"
      println(str)
      true
    })

    GraphUtil.resetVisited(baseVertex)
    GraphUtil.search(baseVertex, "Charlie", (vtx:Vertex) => {
      println(vtx.name)
      true
    })
  }
}
