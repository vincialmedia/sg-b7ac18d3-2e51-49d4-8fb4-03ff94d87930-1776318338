import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/lib/supabase"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    console.log("API: Received request body:", req.body)
    
    const { email, services, points, marketingConsent } = req.body

    // Validate required fields
    if (!email || !services || typeof points === 'undefined') {
      console.log("API: Missing required fields")
      return res.status(400).json({
        success: false,
        message: "Missing required fields: email, services, and points are required"
      })
    }

    console.log("API: Attempting to insert into Supabase...")

    // Store the package request in Supabase
    const { data, error } = await supabase
      .from("package_requests")
      .insert([
        {
          email,
          services,
          points,
          marketing_consent: marketingConsent || false,
          status: "pending"
        }
      ])
      .select()
      .single()

    if (error) {
      console.error("API: Supabase insert error:", error)
      throw error
    }

    console.log("API: Successfully inserted data:", data)

    // Trigger email notification using Supabase Edge Function
    console.log("API: Attempting to send email notification...")
    
    const { error: emailError } = await supabase.functions.invoke("send-notification", {
      body: {
        to: "vincent@vincialmedia.com",
        subject: `New Package Request from ${email}`,
        packageRequest: data
      }
    })

    if (emailError) {
      console.error("API: Error sending email:", emailError)
      // Don't return error to client, as the data was saved successfully
    } else {
      console.log("API: Email notification sent successfully")
    }

    return res.status(200).json({
      success: true,
      message: "Package request submitted successfully",
      data
    })

  } catch (error) {
    console.error("API: Error submitting package request:", error)
    
    // Provide more specific error messages
    let errorMessage = "Failed to submit package request"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    
    return res.status(500).json({
      success: false,
      message: errorMessage,
      error: error instanceof Error ? error.message : "Unknown error"
    })
  }
}
