package ch.patrickguenthard.graph.persistence

import java.io._

import ch.patrickguenthard.graph.common.Constants

import scala.io._
/**
  * Created by Patrick on 08.12.2016.
  */
object PersistenceUtil {
  def readFile():String = {
    Source.fromFile(Constants.DATA_STORAGE_DIRECTORY + Constants.DATA_STORAGE_FILE).mkString
  }

  def saveFile(saveString:String) = {
    val w = new BufferedWriter(new FileWriter(Constants.DATA_STORAGE_DIRECTORY + Constants.DATA_STORAGE_FILE))
    w.write(saveString)
    w.close()
  }
}
