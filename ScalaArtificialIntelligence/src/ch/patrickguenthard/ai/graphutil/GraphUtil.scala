package ch.patrickguenthard.ai.graphutil

import ch.patrickguenthard.ai.model.Vertex

/**
  * Created by Patrick on 08.12.2016.
  */
object GraphUtil {



  def processAll(vertex:Vertex, func: (Vertex) => Boolean):Unit= {
    var continue:Boolean = func(vertex)
    vertex.visited = true;
    if(continue) {
      for (ied <- vertex.inEdges) {
        if(!ied.fromVertex.visited) {
          processAll(ied.fromVertex, func)
        }
      }
      for (oed <- vertex.outEdges) {
        if(!oed.toVertex.visited) {
          processAll(oed.toVertex, func)
        }
      }
    }
  }

  def resetVisited(vertex: Vertex):Unit = {
    vertex.visited = false

    for (ied <- vertex.inEdges) {
      if(ied.fromVertex.visited) {
        resetVisited(ied.fromVertex)
      }
    }
    for (oed <- vertex.outEdges) {
      if(oed.toVertex.visited) {
        resetVisited(oed.toVertex)
      }
    }
  }

  def search(vertex:Vertex, searchTerm:String, callback: (Vertex) => Unit) = {
    processAll(vertex, (vtx) => {
      if(searchTerm.eq(vtx.name)) {
        callback(vtx)
        false
      }
      else {
        true
      }

    })
  }
}
