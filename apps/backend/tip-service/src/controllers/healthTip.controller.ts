
import {
  Controller,
  Route,
  Post,
  Body,
  Get,
  Path,
  Put,
  Delete,
  Query,
} from "tsoa";

import { HealthTipRepository } from "../database/repositories/healthTip.repository";
import mongoose from "mongoose";
import { IHealthTip } from "../models/healthTip.model";

const healthTipRepository = new HealthTipRepository();

@Route("/health-tips")
export class HealthTipController extends Controller {

  @Post("/")
  public async createNewHealthTip(
    @Body() requestBody: IHealthTip
  ): Promise<IHealthTip> {
    try {
      const newHealthTip = await healthTipRepository.createHealthTip(requestBody);
      return newHealthTip;
    } catch (error) {
      this.setStatus(500);
      if (error instanceof Error) {
        throw new Error(`Failed to create health tip: ${error.message}`);
      }
      throw new Error("Failed to create health tip: Unknown error occurred");
    }
  }

  @Get("/")
  public async getAllHealthTips(
    @Query() category?: string
  ): Promise<IHealthTip[]> {
    try {
      const healthTips = await healthTipRepository.getAllHealthTips(category);
      return healthTips;
    } catch (error) {
      this.setStatus(500);
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve health tips: ${error.message}`);
      }
      throw new Error("Failed to retrieve health tips: Unknown error occurred");
    }
  }

  @Get("/{healthTipId}")
  public async getHealthTipById(
    @Path("healthTipId") healthTipId: string
  ): Promise<IHealthTip | { message: string }> {
    if (!mongoose.Types.ObjectId.isValid(healthTipId)) {
      this.setStatus(400); 
      return { message: `Invalid ID format: ${healthTipId}` };
    }

    try {
      const healthTip = await healthTipRepository.getHealthTipById(healthTipId);
      if (!healthTip) {
        this.setStatus(404); 
        return { message: "Health tip not found" };
      }
      return healthTip;
    } catch (error) {
      this.setStatus(500);
      if (error instanceof Error) {
        return { message: `Failed to retrieve health tip: ${error.message}` };
      }
      return {
        message: "Failed to retrieve health tip: Unknown error occurred",
      };
    }
  }

  @Put("/updateHealthTipById/{healthTipId}")
  public async updateHealthTipById(
    @Path("healthTipId") healthTipId: string,
    @Body() requestBody: Partial<IHealthTip>
  ): Promise<IHealthTip | { message: string }> {
    if (!mongoose.Types.ObjectId.isValid(healthTipId)) {
      this.setStatus(400); 
      return { message: `Invalid ID format: ${healthTipId}` };
    }

    try {
      const updatedHealthTip = await healthTipRepository.updateHealthTipById(
        healthTipId,
        requestBody
      );
      if (!updatedHealthTip) {
        this.setStatus(404); 
        return { message: "Health tip not found" };
      }
      return updatedHealthTip;
    } catch (error) {
      this.setStatus(500);
      if (error instanceof Error) {
        return { message: `Failed to update health tip: ${error.message}` };
      }
      return { message: "Failed to update health tip: Unknown error occurred" };
    }
  }

  @Delete("/{healthTipId}")
  public async deleteHealthTipById(
    @Path("healthTipId") healthTipId: string
  ): Promise<IHealthTip | { message: string }> {
    if (!mongoose.Types.ObjectId.isValid(healthTipId)) {
      this.setStatus(400);
      return { message: `Invalid ID format: ${healthTipId}` };
    }

    try {
      const deletedHealthTip = await healthTipRepository.deleteHealthTipById(healthTipId);
      if (!deletedHealthTip) {
        this.setStatus(404); 
        return { message: "Health tip not found" };
      }
      return deletedHealthTip;
    } catch (error) {
      this.setStatus(500);
      if (error instanceof Error) {
        return { message: `Failed to delete health tip: ${error.message}` };
      }
      return { message: "Failed to delete health tip: Unknown error occurred" };
    }
  }
}
