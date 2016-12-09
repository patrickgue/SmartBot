package ch.patrickguenthard.ai.persistence

import ch.patrickguenthard.ai.common.Constants
import scala.io._
/**
  * Created by Patrick on 08.12.2016.
  */
object PersistenceUtil {
  def readFile():String = {
    Source.fromFile(Constants.DATA_STORAGE_DIRECTORY + Constants.DATA_STORAGE_FILE).mkString
  }
}
