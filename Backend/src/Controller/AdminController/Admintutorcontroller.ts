import { Request, Response } from "express";
import TutorModel, { TUTOR } from "../../model/tutorModel";

interface Tutor {
  _id: string;
  tutorName: string;
  tutorEmail: string;
  phone: string;
}

//get All Tutors

const getAlltutors = async (req: Request, res: Response) => {
  try {
    const tutorDetails = await TutorModel.find().exec();

    if (tutorDetails.length > 0) {
      //console.log("Get all tutor details:", tutorDetails);
      res.status(200).json({
        tutorDetails,
        message: "Tutors found",
      });
    } else {
      return res.status(404).json({
        message: "No tutors found",
      });
    }
  } catch (error) {
    console.error("Error fetching tutors:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const searchTutor = async (req: Request, res: Response) => {
  try {
    const searchCriteria = req.query.searchCriteria;

    // Validate searchCriteria
    if (!searchCriteria || typeof searchCriteria !== "string") {
      return res.status(400).send("Invalid search criteria");
    }
    const tutorDetails = await TutorModel.find({
      $and: [
        { tutorName: { $regex: `^${searchCriteria}`, $options: "i" } }, // Starts with 'a' search
        { tutorName: { $not: { $eq: "Admin" } } }, // Exclude records where name is 'admin' (case-insensitive)
      ],
    });
    res.status(200).json(tutorDetails); // Send the found tutors as a JSON response
  } catch (error:any) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//Block the tutor

const unlistTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tutor = await TutorModel.findById(id);

    if (!tutor) {
      console.log("Tutor not found");
      return res.status(404).json({ message: "Tutor not found" });
    }

    tutor.isBlocked = true;
    await tutor.save();

    return res
      .status(200)
      .json({ message: "Tutor has been successfully unlisted" });
  } catch (error) {
    console.error("Error while unlisting tutor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//unblock the tutor
const relistTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id, "tutorid to unblock");
    const tutor = await TutorModel.findById(id);

    if (!tutor) {
      console.log("Tutor not found");
      return res.status(404).json({ message: "Tutor not found" });
    }

    tutor.isBlocked = false; // Setting isBlocked to false to relist the tutor
    await tutor.save();

    return res
      .status(200)
      .json({ message: "Tutor has been successfully relisted" });
  } catch (error) {
    console.error("Error while relisting tutor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { searchTutor, getAlltutors, unlistTutor, relistTutor };
